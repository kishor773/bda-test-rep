const { restart } = require('nodemon');
var userService = require('../Service/userService');

var getUserDataController = async (req, res) => {
  try {
    var userData = await userService.getUserDataService();
    if (userData) {
      res.json({ "message": userData, "status": true })
    }
    else {
      res.json({ "message": "not able to get data", "status": false })
    }
  }

  catch (error) {
    console.log(error);
    res.json({ "message": "internal Storage error", "status": false })
  }
}

var postUserDataController = async (req, res) => {
  try {
    var userData = await userService.postUserDataService(req.body);
    res.json({ errorCode: 0, "message": userData, "status": true })

  }

  catch (error) {
    console.log(error);
    res.json({ errorCode: 1, "message": "internal Storage error", "status": false })
  }
}

var putUserDataController = async (req, res) => {
  try {
    var userData = await userService.putUserDataService(req.params.userId, req.body);
    // console.log('userData====', userData)
    res.json({ errorCode: 0, message: "User Details Updated Sucessfully", data: userData })
  }

  catch (error) {
    // console.log(error);
    res.json({ errorCode: 1, message: "Failed to update user data ", data: error })
  }
}
module.exports = { getUserDataController, postUserDataController, putUserDataController }