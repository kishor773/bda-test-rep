var stateCityService = require('../Service/indian_states_citiesService');
var getStateCityDataController= async(req,res)=>{
    try{
     var categoriesData= await (stateCityService.getStateCityDataService());
     if(categoriesData){
        console.log(categoriesData)
        res.status(200).send({"message":categoriesData,"status":true})
     }
     else{
        res.status(200).send({"message":"not got any data","status":false})
     }
    }
    catch(error){
    console.log(error);
    res.status(500).send({"message":"Internal Storage Error","status":false})
    }
    }

    module.exports={getStateCityDataController}