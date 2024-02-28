const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const env = process.env
const server = express();
const url = env.MONGO_DB_BASE_URL;
const port = 3000;

const userModel = require('./src/Model/userModel');
const plansModel = require('./src/Model/plansModel');
const servicesModel = require('./src/Model/servicesModel');
const auth = require('./src/middleware/jwt');
const cors = require('cors');
mongoose.connect(url)
    .then(() => {
        console.log("DB business_directory_database :) is connected")
    })
    .catch(() => {
        console.log("DB business_directory_database is not Connected")
    })

server.use(cors());
server.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization, userName, customparams, token, x-access-token"
    );
    next();
});
server.use(express.json());
server.use('/api', require('./src/routes/routes'));

//JWT  Implemenet Authentication
server.post('/login-user', async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        // Check if the provided credentials match either email or phone number
        const user = await userModel.findOne({ $or: [{ email }, { phone }], password });

        if (!user) {
            // If user does not exist or credentials are incorrect, return an error response
            return res.json({ errorCode: 1, message: 'Invalid email/phone or password' });
        }

        // {
        //     "_id": {
        //       "$oid": "65952199ca69c2a4e60a4514"
        //     },
        //     "userId": 1,
        //     "firstName": "Shravan",
        //     "lastName": "NP",
        //     "name": "",
        //     "email": "nspkumar6573@gmail.com",
        //     "phone": "9731044506",
        //     "password": "snp@1234",
        //     "isAdmin": true,
        //     "currentLocation": "bengaluru",
        //     "currentActivePlan": "gold",
        //     "userPlanHistory": [
        //       {
        //         "paymentInfo": {
        //           "paymentStatus": "Success",
        //           "transactionId": "abc123",
        //           "paymentDate": "2024-01-01T12:34:56.000Z"
        //         },
        //         "userPlanHistoryId": 1,
        //         "planId": 2,
        //         "planName": "gold",
        //         "planPrice": 1000,
        //         "planValidity": 30,
        //         "planStartDate": "2024-01-01T00:00:00.000Z",
        //         "planEndDate": "2024-01-31T23:59:59.000Z"
        //       }
        //     ],
        //     "referralCode": "ABC123",
        //     "notifPrefCheck": true,
        //     "serviceCategory": [
        //       {
        //         "serviceId": 2,
        //         "notificationFlag": true,
        //         "serviceName": "safety",
        //         "serviceLocation": "bengaluru",
        //         "locationId": 2,
        //         "userType": "Provider"
        //       }
        //     ],
        //     "userRegStatus": "Approved",
        //     "userStatus": "Active",
        //     "token": ""
        //   }
        // If user exists and credentials are correct, generate JWT token

        const payload = {
            userId: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email,        //     "lastName": "NP",
            name: user.name,
            phone: user.phone,
            whatsappNo: user.whatsappNo,
            businessNo: user.businessNo,
            password: user.password,
            isAdmin: user.isAdmin,
            currentLocation: user.currentLocation,
            referralCode: user.referralCode,
            notifPrefCheck: user.notifPrefCheck,
            serviceCategory: user.serviceCategory,
            userStatus: user.userStatus,
            familyName: user.familyName,
            middleName: user.middleName
            /** 
* Paste one or more documents here
*/
        };
        // Customize payload as needed
        const token = auth.generateJWTToken(payload);

        // Send the token back in the response
        res.json({ errorCode: 0, payload, token });
    } catch (error) {
        // Handle any errors
        // console.error('Error:', error);
        res.json({ errorCode: 1, message: 'Something went wrong', errorMsg: error });
    }
});
//JWT Implemenet  Authentication  PROTECT ROUTES
server.get('/protectedRoute', auth.verifyToken, (req, res) => {
    // Access user information from req.user
    res.json({ message: 'You have access to protected data', user: req.user });
});

//!FULL-TEXT-SEARCH FOR SERVICES COLLECTION
server.get('/services/:query', auth.verifyToken, async (req, res) => {
    console.log(req.params)
    try {
        const query = req.params.query;
        const services = await servicesModel.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });
        console.log(services);
        res.json(services);
    }
    catch (error) {
        console.error('Error searching search string:', error);
        res.json({ message: 'Error in matching search string' });
    }
})
//FULL-TEXT-SEARCH FOR PLANS COLLECTION
server.get('/plans/:query', async (req, res) => {
    try {
        // Get the search query from request parameters
        const query = req.params.query;

        // Find users based on text search in MongoDB
        const users = await plansModel.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        // Send the search results as response
        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
}),
    //port
    server.listen(`${port}`, function check(error) {
        if (error) {
            console.log("error", error)
        }
        else {
            console.log(`Server is listening to ${port}`)
        }
    })