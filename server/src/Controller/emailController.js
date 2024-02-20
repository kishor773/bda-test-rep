var emailService= require('../Service/emailService');
var postEmailDataController = async (req, res) => {
    try {
      var emailData = await emailService.postEmailDataService(req.body);
      if (emailData) {
        res.send({ "message": emailData, "status": true });
      }
      else {
        res.send({ "message": "not able to post", "status": false });
      }
    }
    catch (error) {
      console.log(error);
      res.send({ "message": "Internal Storage Error", "status": false })
    }
  }
  module.exports={postEmailDataController}