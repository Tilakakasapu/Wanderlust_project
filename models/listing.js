const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./reviews');
const listingSchema = new schema({
    title : {
        type:String,
        require:true
    },
    description:String,
    image: {
        type: {
          url: {
            type: String,
            default: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          filename: {
            type: String,
            default: 'default_image'
          }
        },
        set: (v) => {
          if (!v || !v.url) {
            return {
              url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              filename: 'default_image'
            };
          }
          return v;
        }
      },
    price:Number,
    location:String,
    country:String,
    reviews:[{
      type: schema.Types.ObjectId,
      ref:'Review',
     }],
     owner:{
      type: schema.Types.ObjectId,
      ref : 'User'
     }
});

listingSchema.post('findOneAndDelete', async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  } 
})

const listing = mongoose.model('listing',listingSchema);
module.exports = listing;