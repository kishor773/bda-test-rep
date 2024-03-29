var notificationsService=require("../Service/notificationsService");

var getNotificationsDataController= async(req,res)=>{
 try{
            var notificationsData= await notificationsService.getNotificationsDataService();
            if(notificationsData){
                res.json({"message":notificationsData,"status":true})
            }
            else{
                res.json({"message":'not getting any data',"status":false})
            }
 }
 catch(error){
          console.log(error);
          res.json({"message":"Internal Storage Error", "status":false})
 }
}

var postNotificationsDataController = async(req,res)=>{
    try{
var notificationsData= await notificationsService.postNotificationsDataService(req.body);
if(notificationsData){
    res.json({"message":notificationsData,"status":true})
}
else{
    res.json({"message":"not able to post data","status":false})
}
    }
    catch(error){
        console.log(error);
  res.json({"message":"internal Storage error","status":false})
    }
}
var putNotificationsDataController =async(req,res)=>{
try{
 var notificationsData= await notificationsService.putNotificationsDataService(req.params._id,req.body);
 if(notificationsData){
 res.json({"message":notificationsData ,"status":true})
 }
 else{
    res.json({"message":"not able to update","status":false})
 }
}
catch(error){
    console.log(error);
    res.json({"message":"internal Storage Error" ,"status":fail})
}
}







module.exports={getNotificationsDataController,postNotificationsDataController,putNotificationsDataController}