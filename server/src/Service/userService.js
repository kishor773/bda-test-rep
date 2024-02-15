var userModel = require('../Model/userModel');

module.exports.getUserDataService = async () => {

    try {
        var data = await userModel.find({});
        return data
    }
    catch (error) {
        console.log(error);
        return error
    }
}

module.exports.postUserDataService = async (userDetails) => {

    try {

        // var userModelData= new userModel();
        // userModelData.userId=userDetails.userId,
        // userModelData.firstName=userDetails.firstName,
        // userModelData.lastName=userDetails.lastName,
        // userModelData.familyName=userDetails.familyName,
        // userModelData.middleName=userDetails.middleName,
        // userModelData.whatsappNo=userDetails.whatsappNo,
        // userModelData.businessNo=userDetails.businessNo,
        // userModelData.name=userDetails.name,
        // userModelData.email=userDetails.email,
        // userModelData.phone=userDetails.phone,
        // userModelData.password=userDetails.password,
        // userModelData.isAdmin=userDetails.isAdmin,
        // userModelData.currentLocation=userDetails.currentLocation,
        // userModelData.currentActivePlan=userDetails.currentActivePlan,
        // userModelData.referralCode=userDetails.referralCode,
        // userModelData.notifPrefCheck=userDetails.notifPrefCheck,
        // userModelData.userPlanHistory=userDetails.userPlanHistory.map(users=>({
        //     paymentInfo:{
        //         paymentStatus:users.paymentInfo.paymentStatus,
        //         transactionId:users.paymentInfo.transactionId,
        //         paymentDate:users.paymentInfo.paymentDate,
        //     },
        //     userPlanHistoryId:users.userPlanHistoryId,
        //     planId:users.planId,
        //     planName:users.planName,
        //     planPrice:users.planPrice,
        //     planValidity:users.planValidity,
        //     planStartDate:users.planStartDate,
        //     planEndDate:users.planEndDate
        // }));
        // userModelData.userRegStatus=userDetails.userRegStatus,
        // userModelData.userStatus=userDetails.userStatus,
        // userModelData.serviceCategory=userDetails.serviceCategory.map(category=>({
        //     categoryName:category.categoryName,
        //     notificationFlag:category.notificationFlag,
        //     serviceName:category.serviceName,
        //     serviceLocation:category.serviceLocation,
        //     locationName:category.locationName,
        //     userType:category.userType,

        // }))
        var data = await userModel.create(userDetails);
        console.log(data, "user-data")
        return data

    }
    catch (error) {
        console.log(error);
        return error
    }
}
module.exports.putUserDataService = async (_id, userDetails) => {
    try {
        const filter = {
            '_id': _id
        };
        // Set {new: true} to return the updated document
        const options = { new: true };
        const data = await userModel.findOneAndUpdate(filter, userDetails, options);
        console.log('updated data', data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
