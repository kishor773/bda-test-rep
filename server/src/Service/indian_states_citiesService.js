var stateCityModel=require('../Model/indian_states_citiesModel');
module.exports.getStateCityDataService= async()=>{
    try{
        var categoriesData= await stateCityModel.find({});
        return categoriesData
    }
    catch(error){
        console.log(error);
        return error;
    }
}