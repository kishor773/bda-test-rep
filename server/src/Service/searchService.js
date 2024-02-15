var searchModel= require('../Model/searchModel')

module.exports.getSearchDataService = async()=>{

    try{
 var data= await searchModel.find({});
 return data
    }
    catch(error){
        console.log(error);
        return error;
    }
}

module.exports.postSearchDataService=async(searchDetails)=>{

    try{
 
 var searchModelData= new searchModel();
 searchModelData.email=searchDetails.email,
 searchModelData.phone=searchDetails.phone,
 searchModelData.searchHistory=searchDetails.searchHistory.map(search=>({
    serviceName:search.serviceName,
    serviceType:search.serviceType,
    serviceLocation:search.serviceLocation.map(search1=>({
        locationId:search1.locationId,
        locationName:search1.locationName,
        city:search1.city,
        state:search1.state,
        pincode:search1.pincode,
        country:search1.country,
        coords:{
            latitude:search1.coords.latitude,
            longitude:search1.coords.longitude,
            speed:search1.coords.speed,
            accuracy:search1.coords.accuracy
        }
    }))
 }))
 var data = await searchModelData.save();
 return data
    }
    catch(error){
        console.log(error);
        return error
    }
}

module.exports.putSearchDataService=async(locationId,searchDetails)=>{
    try{
        const filter={
            'searchHistory.serviceLocation.locationId':locationId
        }
 var data = await searchModel.updateOne(filter,searchDetails);
 return data;
    }
    catch(error){
        console.log(error)
        return error
    }
}