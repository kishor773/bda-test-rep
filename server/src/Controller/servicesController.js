var servicesService = require('../Service/servicesService');
var getServicesIdDataController = async (req, res) => {
   try {
      console.log(req.params, req.body)
      var servicesData = await servicesService.getServicesIdDataService(req.params._id);

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
         res.json({ "message": servicesData, "status": true })
      }
      else {
         res.json({ "message": "not able to get ", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.json({ "message": "internal storage error", "status": false })
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
         res.json({ "message": servicesData, "status": true })
      }
      else {
         res.json({ "message": "not able to post data", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.json({ "message": "internal storage error", "status": false })
   }
}

var putServicesDataController = async (req, res) => {
   try {
      var servicesData = await servicesService.putServicesDataService(req.params._id, req.body);
      // var servicesData = await servicesService.putServicesDataServiceInExistingArray(req.params._id, req.body);
      res.json({ "errorCode": 0, "message": "Updated services successfully", "data": servicesData, "status": true })
   }
   catch (error) {
      console.log(error);
      res.json({ "errorCode": 1, "message": "Failed to update services", "status": false, "errorData": error })
   }
}

var getServicesByCategoryName = async (req, res) => {
   // console.log('get-serv-categ-name----', req.params);

   try {
      var servicesData = await servicesService.getServByCategName(req.params.name);

      res.json({ "errorCode": 0, "message": "Sucessfully fetched service by category name", "data": servicesData, "status": true })
   }
   catch (error) {
      // console.log(error);
      res.json({ "errorCode": 1, "message": 'Failed to fetch service by category name', "data": error, "status": false })

   }
}
var filterSerBasedOnCatController = async (req, res) => {
   try {
      var servicesData = await servicesService.filterSerBasedOnCatDataService(req.body);
      if (servicesData) {
         res.status(200).send({ "message": servicesData, "status": true })
      }
      else {
         res.status(200).send({ "message": "not able to filter the  data", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.status(500).send({ "message": "internal storage error", "status": false })
   }
}

var getServicesByServiceDetailsIdDataController = async (req, res) => {
   try {
      console.log(req.params);
      var servicesData = await servicesService.getServicesByServiceDetailsIdDataService(req.params._id, req.body);

      res.json({ "message": servicesData, "status": true })
   }
   catch (error) {
      console.log(error);
      res.json({ "message": 'Failed to fetch service by Id', "status": false })

   }
}
module.exports = { filterSerBasedOnCatController, getServicesByServiceDetailsIdDataController, getServicesDataController, serviceSort, postServicesDataController, putServicesDataController, getServicesIdDataController, getServicesByCategoryName }