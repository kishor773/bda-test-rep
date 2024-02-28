var locationsService = require('../Service/locationsService');

var getLocationsDataController = async (req, res) => {

  try {
    var locationsData = await locationsService.getLocationsDataService();
    if (locationsData) {
      res.json({ "message": locationsData, "status": true })
    }
    else {
      res.json({ "message": "not got any data", "status": false })
    }
  }



  catch (error) {
    console.log(error);
    res.json({ "message": "internal Server error", "status": false })

  }
}

var postLocationsDataController = async (req, res) => {
  try {
    var locationsData = await locationsService.postLocationsDataService(req.body);
    if (locationsData) {
      res.json({ "message": locationsData, "status": true });
    }
    else {
      res.json({ "message": "not able to post", "status": false });
    }
  }
  catch (error) {
    console.log(error);
    res.json({ "message": "Internal Storage Error", "status": false })
  }
}

var putLocationsDataController = async (req, res) => {
  console.log('1212112112212---',req.params)
  try {
    var locationsData = await locationsService.putLocationsDataService(req.params._id, req.body);
    res.json({ 'errorCode': 0, "message": 'Updated Locations', data: locationsData, "status": true });

  }
  catch (error) {
    console.log(error);
    res.json({ 'errorCode': 1, "message": "Failed to update locations", "status": false })
  }
}



module.exports = { getLocationsDataController, postLocationsDataController, putLocationsDataController }