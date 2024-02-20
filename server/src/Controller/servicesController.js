var servicesService = require('../Service/servicesService');
var getServicesIdDataController = async (req, res) => {
   try {
      var servicesData = await servicesService.getServicesIdDataService(req.params._id, req.body);

      res.json({ "message": servicesData, "status": true })
   }
   catch (error) {
      console.log(error);
      res.json({ "message": 'Failed to fetch service by Id', "status": false })

   }
}



var getServicesDataController = async (req, res) => {
   try {
      var servicesData = await servicesService.getServicesDataService();

      if (servicesData) {
         res.status(200).send({ "message": servicesData, "status": true })
      }
      else {
         res.status(200).send({ "message": "not able to get ", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.status(500).send({ "message": "internal storage error", "status": false })
   }
}

var serviceSort = async (req, res) => {
   try {
      var servicesSortedData = await servicesService.servicesSortBy();
      res.json({ "message": servicesSortedData, "status": true })

   } catch (error) {
      console.log(error);
      res.json({ "message": "Failed to sort data", "status": false })
   }
}

var postServicesDataController = async (req, res) => {
   try {
      var servicesData = await servicesService.postServicesDataService(req.body);
      if (servicesData) {
         res.status(200).send({ "message": servicesData, "status": true })
      }
      else {
         res.status(200).send({ "message": "not able to post data", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.status(500).send({ "message": "internal storage error", "status": false })
   }
}

var putServicesDataController = async (req, res) => {
   try {
      var servicesData = await servicesService.putServicesDataService(req.params._id, req.body);

      if (servicesData) {
         res.status(200).send({ "message": servicesData, "status": true })
      }
      else {
         res.status(200).send({ "message": "not able to put data", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.status(500).send({ "message": "internal storage error", "status": false })
   }
}
module.exports = { getServicesDataController, serviceSort, postServicesDataController, putServicesDataController, getServicesIdDataController }