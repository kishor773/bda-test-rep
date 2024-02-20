var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const serviceSchema = new Schema({
  categories: [{
    categoryName: {
      type: String,
      required: false,
    },
    category: [{
      
      serviceName: {
        type: String,
        required: false,
      },
      serviceTagName: {
        type: String,
        required: false,
      },
 
      servicePhotos: {
        photo1: {
          type: String,
          required: false,
        },
        photo2: {
          type: String,
          required: false,
        },
        photo3: {
          type: String,
          required: false,
        },
        photo4: {
          type: String,
          required: false,
        },
        photo5: {
          type: String,
          required: false,
        },
      },
      serviceDesc:{
        type: String,
        required: false,
      },
      serviceTime:{
        type: String,
        required: false,
      },
      serviceLocation: [{
        locationId:{
          type: Number,
          required: false,
        },
        locationName:{
          type: String,
          required: false,
        },
        coords: {
          latitude:{
            type: Number,
            required: false,
          },
          longitude: {
            type: Number,
            required: false,
          },
          speed: {
            type: Number,
            required: false,
          },
          accuracy: {
            type: Number,
            required: false,
          },
        },
        
      }],
      serviceType: {
        type: String,
        required: false,
      },
      servicePaymentDetails: {
        acceptedPayMode:{
          type: String,
          required: false,
        },
        price: {
          type: String,
          required: false,
        },
      },
     
      address: [{
        addressTitle:{
          type: String,
          required: false,
        },
        state: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        pincode: {
          type: String,
          required: false,
        },
        country: {
          type: String,
          required: false,
        },
       
     } ],
     
     
      businessUrl:{
        instagramUrl:{
          type: String,
          required: false,
        },
        youtubeUrl:{
          type: String,
          required: false,
        },
        twitterUrl:{
          type: String,
          required: false,
        }
      },
      workingHours:{
        fromDay:{
          type: String,
          required: false,
        },
        toDay:{
          type: String,
          required: false,
        },
        fromTime:{
          type: String,
          required: false,
        },
        toTime:{
          type: String,
          required: false,
        },
      },
      serviceCategory: {
        type: String,
        required: false,
      },
      serviceAvgRatings: {
        type: Number,
        required: false,
      },
      serviceReviews: [{
        email: {
          type: String,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        usrRatings: {
          type: Number,
          required: false,
        },
        description:{
          type: String,
          required: false,
        },
      }],
      listedBy: {
        type: String,
        required: false,
      },
      serviceReports: [{}],
      listingDate: {
        type: String,
        required: false,
      },
      serviceEnquiry: {
        email: {
          type: String,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        enquiryDetails:{
          type: String,
          required: false,
        },
      },
    }],
    subCategory1: [{}],
    subCategory2: [{}],
    subCategory3: [{}],
    userDetails:[{
      
     
    }],
    type: [{}],
    aminities: [{}],
  }],
});



module.exports = mongoose.model('services', serviceSchema);
