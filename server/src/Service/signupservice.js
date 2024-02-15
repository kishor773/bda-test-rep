var userModel = require('../Model/userModel');

module.exports.postSignupDataService = async (signupDetails) => {

  try {
    var signupModelData = new userModel();
    signupModelData.firstName = signupDetails.firstName,
      signupModelData.lastName = signupDetails.lastName,
      signupModelData.phone = signupDetails.phone,
      signupModelData.email = signupDetails.email,
      signupModelData.password = signupDetails.password,
      signupModelData.currentLocation = signupDetails.currentLocation
     
      // signupModelData.isAdmin = signupDetails.isAdmin,
      // signupModelData.userStatus = signupDetails.userStatus,
      // signupModelData.currentActivePlan = signupDetails.currentActivePlan

    var data = await signupModelData.save();
    //   console.log(data,"data");
    return data;
  }
  catch (error) {
    console.log(error);
    return error
  }
}
