var locationsService = require('../Service/locationsService');

var getLocationsDataController = async (req, res) => {

  try {
    var locationsData = await locationsService.getLocationsDataService();
    if (locationsData) {
      res.status(200).send({ "message": locationsData, "status": true })
    }
    else {
      res.status(200).send({ "message": "not got any data", "status": false })
    }
  }



  catch (error) {
    console.log(error);
    res.status(500).send({ "message": "internal Server error", "status": false })

  }
}

var postLocationsDataController = async (req, res) => {
  try {
    var locationsData = await locationsService.postLocationsDataService(req.body);
    if (locationsData) {
      res.status(200).send({ "message": locationsData, "status": true });
    }
    else {
      res.status(200).send({ "message": "not able to post", "status": false });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ "message": "Internal Storage Error", "status": false })
  }
}

var putLocationsDataController = async (req, res) => {
  try {
    var locationsData = await locationsService.putLocationsDataService(req.params.locationId, req.body);
    if (locationsData) {
      res.status(200).send({ "message": locationsData, "status": true });
    }
    else {
      res.status(200).send({ "message": "not update", "status": false })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ "message": "Internal storage error", "status": false })
  }
}



module.exports = { getLocationsDataController, postLocationsDataController, putLocationsDataController }