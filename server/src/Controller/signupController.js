var signupService = require('../Service/signupservice');
var postSignupDatacontroller = async (req, res) => {
   try {
      var signupData = await signupService.postSignupDataService(req.body);
      res.json({ errorCode: 0, "message": signupData, "status": true })

   }
   catch (error) {
      console.log(error);
      res.json({ errorCode: 1, "message": "internal storage error", "status": false })
   }
}

module.exports = { postSignupDatacontroller }