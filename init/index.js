const mongoose = require('mongoose');
const initData = require('./data.js');
const listing = require('../models/listing.js');

main().then(()=>{console.log("connected to DB");}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initDb = async () =>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'671ba3cc32e6309f4b7fea1a'}));
    await listing.insertMany(initData.data);
    console.log('data was initialised');
}

initDb();