var signupService = require('../Service/signupservice');
var postSignupDatacontroller = async (req, res) => {
   try {
      var signupData = await signupService.postSignupDataService(req.body);
      console.log("signupData------", signupData)

      if (signupData) {
         res.send({ "errorCode": 0, "message": "User Registered Sucessfully", "data": signupData, "status": true })
      }
      else {
         res.send({ "errorCode": 1, "message": "Something went wrong", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.send({ "errorCode": 1, "message": "Failed to register", "status": false })
   }
}

module.exports = { postSignupDatacontroller }