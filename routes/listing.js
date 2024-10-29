const express = require('express');
const router = express.Router();
const {storage} = require('../cloudconfig.js');
const listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/Expresserror');
const {isLoggedin, isOwner,validateList} = require('../middleware.js');
const listingcont = require('../controllers/listing.js');

 
const multer = require('multer');
const upload = multer({storage}); 

const { Cursor } = require('mongoose');
router.get('/',wrapAsync(listingcont.index));


router.get('/new', isLoggedin,listingcont.rendernew);   

router.post('/',upload.single('list[image]'),wrapAsync(listingcont.createnew));
// router.post('/',upload.single('list[image]'),(req,res)=>{
//     console.log(req.body);
//     res.send(req.file);
// })



router.get('/:id/edit',isLoggedin,wrapAsync(listingcont.renderedit));

router.get('/:id/delete',isLoggedin,isOwner,wrapAsync(listingcont.deletelisting));
router.get('/:id',wrapAsync(listingcont.showlisting));

router.put('/:id',isLoggedin,isOwner,upload.single('list[image]'),wrapAsync(listingcont.editlisting));

module.exports = router;