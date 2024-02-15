var userModel = require('../Model/userModel');

module.exports.getLoginDataService = async () => {
    try {
       
        const existingUser = await userModel.find({ }, 'email phone password');

        if (existingUser) {
       
            return { existingUser };
        } else {
          
            return { success: 'USER NOT FOUND' };
        }
    } catch (error) {
        console.log(error);
        return { error };
    }
}

module.exports.postLoginDataService = async (details) => {
    try {
        var loginData= await userModel.create(details);
   return loginData;
    } catch (error) {
        console.log(error);
        return { error };
    }
}