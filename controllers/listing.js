const listing = require('../models/listing');
const ExpressError = require('../utils/Expresserror');
const {listingschema , reviewSchema} = require('../schema.js');
module.exports.index = async (req,res)=>{
    const allListings = await listing.find({});
    res.render('listings//index.ejs',{allListings});
}

module.exports.rendernew = (req,res)=>{
    res.render('listings//new.ejs');
}


module.exports.createnew = async (req,res,next)=>{
    console.log(req.body);
    const requestBody = Object.assign({}, req.body);
    const { error } = listingschema.validate(requestBody);
    if (error) {
    return res.status(400).json({ message: error.details[0].message });
    }

    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new listing(requestBody.list);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash('success','new Listing Created');
    res.redirect('/listings'); 
}

module.exports.editlisting = async (req, res) => {
    const { id } = req.params; 
    const updatedListing = await listing.findByIdAndUpdate(id, req.body.list, { new: true });
    console.log(req);
    if(typeof req.file!== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url,filename};
        await updatedListing.save();
    };

    req.flash('success', 'Listing Updated');
    res.redirect(`/listings/${id}`);
};


module.exports.renderedit = async (req,res)=>{
    let {id} = req.params;
    let obj = await listing.findById(id);
    let original = obj.image.url.replace('/upload','/upload/c_fill,w_250');

    res.render('listings/edit.ejs',{obj,original});
}

module.exports.deletelisting = async (req,res)=>{
    let {id} = req.params;
    let obj = await listing.findByIdAndDelete(id);
    req.flash('success','Listing Deleted');
    res.redirect('/listing');
}

module.exports.showlisting = async (req,res)=>{
    let {id} = req.params;
    const one_Data = await listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('owner');
    
    if(!one_Data){
        req.flash('error','listing you requested for does not exist!');
        res.redirect('/listings');
    }
    res.render('listings//show.ejs',{one_Data});
}
