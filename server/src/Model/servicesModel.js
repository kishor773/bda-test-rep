var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const serviceSchema = new Schema({
  categoryName: {
    type: String,
    required: false
  },
  serviceDetails: [{
    serviceName: {
      type: String,
      required: false
    },
    serivceDesc: {
      type: String,
      required: false
    },
    servicePhotos: [{
      photo1: {
        type: String,
        required: false
      },
      photo2: {
        type: String,
        required: false
      },
      photo3: {
        type: String,
        required: false
      },
      photo4: {
        type: String,
        required: false
      },
    }],
    businessURL: {
      instagram: {
        type: String,
        required: false
      },
      whatsapp: {
        type: String,
        required: false
      },
      twitter: {
        type: String,
        required: false
      },
      youtube: {
        type: String,
        required: false
      },
    },
    serviceAddress: [{
      addressTitle: {
        type: String,
        required: false
      },
      suburb: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      state: {
        type: String,
        required: false
      },
      country: {
        type: String,
        required: false
      },
      pincode: {
        type: String,
        required: false
      },
      firstName: {
        type: String,
        required: false
      },
      lastName: {
        type: String,
        required: false
      },
      phoneNo: {
        type: String,
        required: false
      },
      fromDay: {
        type: String,
        required: false
      },
      toDay: {
        type: String,
        required: false
      },
      fromTime: {
        type: String,
        required: false
      },
      toTime: {
        type: String,
        required: false
      },

    }],
    avgRatings: {
      type: mongoose.Schema.Types.Decimal128,
      required: false,
      default: 0.0
    },
    serviceRnR: [{
      email: {
        type: String,
        required: false
      },
      name: {
        type: String,
        required: false
      },
      usrRatings: {
        type: Number,
        required: false
      },
      description: {
        type: String,
        required: false
      },
    }],
    serviceReports: [{
      email: {
        type: String,
        required: false
      },
      reportStmt: {
        type: String,
        required: false
      },
      reason: {
        type: String,
        required: false
      },

    }],
    subCategory1: {
      name: {
        type: String,
        required: false
      }
    },
    subCategory2: {
      name: {
        type: String,
        required: false
      }
    },
    subCategory3: {
      name: {
        type: String,
        required: false
      }
    },
    subCategory4: {
      name: {
        type: String,
        required: false
      }
    },
    listedBy: {
      email: {
        type: String,
        required: false
      },
      name: {
        type: String,
        required: false
      },
      phoneNo: {
        type: String,
        required: false
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
    }
  }]

});



module.exports = mongoose.model('services', serviceSchema);

