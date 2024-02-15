var searchService=require('../Service/searchService');

var getSearchDataController=  async(req,res)=>{
try{
  var searchData= await searchService.getSearchDataService();

  if(searchData){
    res.status(200).send({"message":searchData,"status":true})
  }
  else{
    res.status(200).send({"message":"not able to get dataa","status":false})
  }
}
catch(error){
    console.log(error)
    res.status(500).send({"message":"internal storage errroe", "status":false})
}
}



var postSearchDataController =async(req,res)=>{
  try{
    var searchData= await searchService.postSearchDataService(req.body);
    if(searchData){
      res.status(200).send({"message":searchData,"status":true})
    }
    else{
      res.status(200).send({"message":"not able to post the data","status":false})
    }
  }
  catch(error){
    console.log(error);
    res.status(500).send({"message":"Internal storage error","status":false})
  }
}
var putSearchDataController= async(req,res)=>{
  try{
 var searchData= await searchService.putSearchDataService(req.params.locationId,req.body);
 if(searchData){
  res.status(200).send({"message":searchData,"status":true})
 }
 else{
  res.status(200).send({"message":"mot able to update","status":false})
 }
  }
  catch(error){
    console.log(error);
    res.status(500).send({"message":"internal storage error","status":false})
  }
}

module.exports={getSearchDataController,postSearchDataController,putSearchDataController}