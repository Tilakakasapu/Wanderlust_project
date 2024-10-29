if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}
const dburl = process.env.ATLAS_DB_URL;

const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
main().then(()=>{console.log("connected to DB");}).catch(err => console.log(err));
app.set("view engine",'ejs');
const path = require('path');

const ExpressError = require('./utils/Expresserror');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
const engine = require('ejs-mate');
app.engine('ejs',engine);
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'/public')));
const rev_route = require('./routes/review.js');
const user_route = require('./routes/user.js');
const listing_route = require('./routes/listing.js');
const flash = require('connect-flash');

async function main() {
  await mongoose.connect(dburl);
}
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const localStrategy = require("passport-local");
const user = require('./models/user.js');
const store = MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret:"mysupersecretkey",
  },
  touchAfter:24*3600, 

});

store.on('error',()=>{
  console.log("error in mongo session store",err);
});

const sessionOptions = {
    store,
    resave: false,
    saveUninitialized: true,
    secret: "mysecretcode",
    cookie:{
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly: true
    }
}
app.use(session(sessionOptions));



app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.curuser = req.user;
  
  next();
})

app.get('/demouser', async (req,res)=>{
  let fakeuser = new user({
    email: 'student@gmail.com',
    username: 'delta',
  }); 
  let ru =   await user.register(fakeuser,'hello');
  res.send(ru);
})


app.use('/listings/:id/reviews',rev_route);
app.use('/listing/:id/reviews',rev_route);
app.use('/listings',listing_route); 
app.use('/listing',listing_route);
app.use('/',listing_route)

app.get('/', (req, res) => {
  res.send("Welcome to Wanderlust!");
});



// app.get('/',(req,res)=>{
//     res.send('working');
// })

app.all('*',(req,res,next)=>{
    return res.send(req);
    next(new ExpressError(404,"Page Not Found")); 
   })

app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong"} = err;
  let arr = {statusCode: statusCode,message:message};
  res.render('error.ejs',{arr});
  

})

app.listen(8080,()=>{
    console.log("server started");
});


