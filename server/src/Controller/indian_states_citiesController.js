var stateCityService = require('../Service/indian_states_citiesService');
var getStateCityDataController = async (req, res) => {
   try {
      var categoriesData = await (stateCityService.getStateCityDataService());
      if (categoriesData) {
         // console.log(categoriesData)
         res.json({ "message": categoriesData, "status": true })
      }
      else {
         res.json({ "message": "not got any data", "status": false })
      }
   }
   catch (error) {
      console.log(error);
      res.json({ "message": "Internal Storage Error", "status": false })
   }
}

module.exports = { getStateCityDataController }