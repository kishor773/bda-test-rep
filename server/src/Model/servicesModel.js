var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const serviceSchema = new Schema({
  categories: [{
    categoryId: {
      type: Number,
      required: true,
    },
    category: [{
      serviceId: {
        type: Number,
        required: true,
      },
      serviceName: {
        type: String,
        required: true,
      },
      serviceTagName: {
        type: String,
        required: true,
      },
 
      servicePhotos: {
        photo1: {
          type: String,
          required: true,
        },
        photo2: {
          type: String,
          required: true,
        },
        photo3: {
          type: String,
          required: true,
        },
        photo4: {
          type: String,
          required: true,
        },
        photo5: {
          type: String,
          required: true,
        },
      },
      serviceDesc:{
        type: String,
        required: true,
      },
      socialUrls:{
        whatsappUrl:{
          type: String,
        required: true,
        },
        instagramUrl:{
          type: String,
          required: true,
        },
        youTubeUrl:{
          type: String,
          required: true,
        },
        twitterUrl:{
          type: String,
          required: true,
        }
      },
      workingHours: [{
        fromDay:{
          type: String,
          required: true,
        },
        toDay:{
          type: String,
          required: true,
        },
        fromTime:{
          type: String,
          required: true,
        },
        toTime:{
          type: String,
          required: true,
        }
      }],
      address: [{
        addressTitle:{
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        fromDay2:{
          type: String,
          required: true,
        },
        toDay2:{
          type: String,
          required: true,
        },
        fromTime2:{
          type: String,
          required: true,
        },
        toTime2:{
          type: String,
          required: true,
        }
     } ],
      serviceLocation: [{
        locationId:{
          type: Number,
          required: true,
        },
        locationName:{
          type: String,
          required: true,
        },
        coords: {
          latitude:{
            type: Number,
            required: true,
          },
          longitude: {
            type: Number,
            required: true,
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
        required: true,
      },
      servicePaymentDetails: {
        acceptedPayMode:{
          type: String,
          required: true,
        },
        price: Number,
      },
      serviceCategory: {
        type: String,
        required: true,
      },
      serviceAvgRatings: {
        type: Number,
        required: true,
      },
      serviceReviews: [{
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        usrRatings: {
          type: Number,
          required: true,
        },
        description:{
          type: String,
          required: true,
        },
      }],
      listedBy: {
        type: String,
        required: true,
      },
      serviceReports: [{}],
      listingDate: {
        type: String,
        required: true,
      },
      serviceEnquiry: {
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        enquiryDetails:{
          type: String,
          required: true,
        },
      },
    }],
    subCategory: [{}],
    type: [{}],
    aminities: [{}],
  }],
});



module.exports = mongoose.model('services', serviceSchema);
