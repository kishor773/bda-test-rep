const { restart } = require('nodemon');
var userService = require('../Service/userService');

var getUserDataController = async (req, res) => {
  try {
    var userData = await userService.getUserDataService();
    if (userData) {
      res.status(200).send({ "message": userData, "status": true })
    }
    else {
      res.status(200).send({ "message": "not able to get data", "status": false })
    }
  }

  catch (error) {
    console.log(error);
    res.status(500).send({ "message": "internal Storage error", "status": false })
  }
}

var postUserDataController = async (req, res) => {
  try {
    var userData = await userService.postUserDataService(req.body);
    if (userData) {
      res.status(200).send({ "message": userData, "status": true })
    }
    else {
      res.status(200).send({ "message": "not able to post data", "status": false })
    }
  }

  catch (error) {
    console.log(error);
    res.status(500).send({ "message": "internal Storage error", "status": false })
  }
}

var putUserDataController = async (req, res) => {
  try {
    var userData = await userService.putUserDataService(req.params.userId, req.body);
    // console.log('userData====', userData)
    res.json({errorCode:0,message:"User Details Updated Sucessfully",data:userData})
  }

  catch (error) {
    // console.log(error);
    res.json({errorCode:1,message:"Failed to update user data ",data:error})
  }
}
module.exports = { getUserDataController, postUserDataController, putUserDataController }