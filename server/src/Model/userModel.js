// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const paymentInfoSchema = new Schema({
//     paymentStatus: String,
//     transactionId: String,
//     paymentDate: Date
// });

// const userPlanHistorySchema = new Schema({
//     userPlanHistoryId: {
//         type: Number,
//         required: true
//     },
//     planId: {
//         type: Number,
//         required: true
//     },
//     planName: {
//         type: String,
//         required: true
//     },
//     planPrice: {
//         type: Number,
//         required: true
//     },
//     planValidity: {
//         type: Number,
//         required: true
//     },
//     planStartDate: {
//         type: Date,
//         required: true
//     },
//     planEndDate: {
//         type: Date,
//         required: true
//     },
//     paymentInfo: paymentInfoSchema
// });

// const serviceCategorySchema = new Schema({
//     serviceId: {
//         type: Number,
//         required: true
//     },
//     notificationFlag: {
//         type: Boolean,
//         required: true
//     },
//     serviceName: {
//         type: String,
//         required: true
//     },
//     serviceLocation: {
//         type: String,
//         required: true
//     },
//     locationId: {
//         type: Number,
//         required: true
//     },
//     userType: {
//         type: String,
//         required: true
//     }
// });

// const userSchema = new Schema({
//     userId: {
//         type: Number,
//         required: true
//     },
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         default: ''
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     isAdmin: {
//         type: Boolean,
//         required: true
//     },
//     currentLocation: {
//         type: String,
//         required: true
//     },
//     currentActivePlan: {
//         type: String,
//         required: true
//     },
//     userPlanHistory: [userPlanHistorySchema],
//     referralCode: String,
//     notifPrefCheck: Boolean,
//     serviceCategory: [serviceCategorySchema],
//     userRegStatus: String,
//     userStatus: String
// });

// module.exports = mongoose.model('users', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     required: false
    // },
    userId: {
        type: Number,
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

    familyName: {
        type: String,
        required: false
    },
    middleName: {
        type: String,
        required: false
    },
    businessNo: {
        type: String,
        required: false
    },
    whatsappNo: {
        type: String,
        required: false
    },
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    },
    currentLocation: {
        type: String,
        required: false
    },
    currentActivePlan: {
        type: String,
        required: false
    },
    userPlanHistory: [{
        userPlanHistoryId: {
            type: Number,
            required: false
        },
        planId: {
            type: Number,
            required: false
        },
        planName: {
            type: String,
            required: false
        },
        planPrice: {
            type: Number,
            required: false
        },
        planValidity: {
            type: Number,
            required: false
        },
        planStartDate: {
            type: Date,
            required: false
        },
        planEndDate: {
            type: Date,
            required: false
        },
        paymentInfo: {
            paymentStatus: String,
            transactionId: String,
            paymentDate: Date
        }
    }],
    referralCode: String,
    notifPrefCheck: Boolean,
    serviceCategory: [{
        categoryName: {
            type: String,
            required: false
        },
        notificationFlag: {
            type: Boolean,
            required: false
        },
        serviceName: {
            type: String,
            required: false
        },
        serviceLocation: {
            type: String,
            required: false
        },
        locationName: [{

        }],
        userType: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        }
    }],
    userRegStatus: String,
    userStatus: String,
    token: {
        type: String,
        required: false
    }
});





module.exports = mongoose.model('users', userSchema);

