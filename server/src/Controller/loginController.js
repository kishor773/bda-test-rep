var loginService = require('../Service/loginService');

var getLoginDataController = async(req,res)=>{
 try{
    var loginData= await loginService.getLoginDataService();
    if(loginData){
        res.status(200).send({ "message": loginData, "status": true })
    }
   
        else {
            res.status(200).send({ "message": "not got any data", "status": false })
          }
    
 }
 catch (error) {
    console.log(error);
    res.status(500).send({ "message": "internal Server error", "status": false })

  }
}
var postLoginDataController = async(req,res)=>{
  try{
     var loginData= await loginService.postLoginDataService(req.body);
     if(loginData){
         res.status(200).send({ "message": loginData, "status": true })
     }
    
         else {
             res.status(200).send({ "message": "not got any data", "status": false })
           }
     
  }
  catch (error) {
     console.log(error);
     res.status(500).send({ "message": "internal Server error", "status": false })
 
   }
 }
module.exports={getLoginDataController,postLoginDataController}