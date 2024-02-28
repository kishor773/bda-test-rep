var plansService = require('../Service/plansService');

var getPlansDataController = async (req, res) => {
  

  try {
    var plansData = await plansService.getPlansDataService();
    if (plansData) {
      res.json({ "message": plansData, "status": true })
    }
    else {
      res.json({ "message": "get plan data", "status": false })
    }
  }
  catch (error) {
    console.log(error);
    res.json({ 'message': "Internal Storage Error", "status": false })
  }
}

var postPlansDataController = async (req, res) => {
  console.log('post plan');
  try {
    var plansData = await plansService.postPlansDataService(req.body);
    if (plansData) {
      res.json({ "message": plansData, "status": true })
    }
    else {
      res.json({ "message": "not able to post the data", "status": false })
    }
  }
  catch (error) {
    console.log(error);
    res.json({ "message": "internal Storage error", "status": false })
  }
}
var putPlansDataController = async (req, res) => {
  try {
    var plansData = await plansService.putPlansDataService(req.params._id, req.body);
    if (plansData) {
      res.json({ "message": plansData, "status": true })
    }
    else {
      res.json({ "message": "not able to update", "status": false })
    }
  }
  catch (error) {
    console.log(error);
    res.json({ "message": "Internal Storage Error", "status": false })
  }
}


module.exports = { getPlansDataController, postPlansDataController, putPlansDataController }