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
    console.log(userData);
    // if (userData) {
    //   res.send({ "message": userData, "status": true })
    // }
    // else {
    //   res.send({ "message": "not able to post data", "status": false })
    // }
  }

  catch (error) {
    console.log(error);
    res.send({ "message": "internal Storage error", "status": false })
  }
}
module.exports = { getUserDataController, postUserDataController, putUserDataController }