var locationsModel=require('../Model/locationsModel');

module.exports.getLocationsDataService=async()=>{
    try{
   var locationsData= await locationsModel.find({});
   return locationsData;
    }
    catch(error){
 console.log(error);
 return error;
    }
}
module.exports.postLocationsDataService= async(locationData)=>{
       try{
         var locationsModelData= new locationsModel();
             locationsModelData.location_details=locationData.location_details.map(location=>({
                locationId:location.locationId,
                locationName:location.locationName,
                coords:{
                    latitude:location.coords.latitude,
                    longitude:location.coords.longitude,
                    speed:location.coords.speed,
                    accuracy:location.coords.accuracy
                },
                 state:location.state,
                 city:location.city,
                 pincode:location.pincode,
                 country:location.country
             }));
             var data = await locationsModelData.save();
             return data;
       }
       catch(error){
        console.log(error);
        return error;
       }
}
module.exports.putLocationsDataService = async(locationId,locationsData)=>{
    try{
        const filter={
            'location_details.locationId':locationId,
        }
    var data = await locationsModel.updateOne(filter,locationsData);
    return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}