var plansModel= require('../Model/plansModel');

module.exports.getPlansDataService=async()=>{
    try{
  var data = await plansModel.find({});
  return data;
    }
    catch(error){
        console.log(error);
        return error
    }
}
module.exports.postPlansDataService= async(plansDetails)=>{
    try{
        var plansModelData = new plansModel();
        plansModelData.planId=plansDetails.planId,
        plansModelData.planName=plansDetails.planName,   
        plansModelData.planPrice=plansDetails.planPrice,  
        plansModelData.planValidity=plansDetails.planValidity,
        plansModelData.planStartDate=plansDetails.planStartDate,
        plansModelData.planEndDate=plansDetails.planEndDate

        var data = await plansModelData.save();
        return data
    }
    catch(error){
        console.log(error);
        return error
    }
}
module.exports.putPlansDataService=async(planId,plansDetails)=>{
    try{
        const filter ={
            'planId':planId
        }
  var data = await plansModel.updateOne(filter,plansDetails);
  return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}