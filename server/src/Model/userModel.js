const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     required: false
    // },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    firmName: {
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
        required: false,
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
        unique: false
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
        category: {
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
        },
        _id: {
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