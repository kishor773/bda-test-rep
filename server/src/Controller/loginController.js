var loginService = require('../Service/loginService');

var getLoginDataController = async(req,res)=>{
 try{
    var loginData= await loginService.getLoginDataService();
    if(loginData){
        res.json({ "message": loginData, "status": true })
    }
   
        else {
            res.json({ "message": "not got any data", "status": false })
          }
    
 }
 catch (error) {
    console.log(error);
    res.json({ "message": "internal Server error", "status": false })

  }
}
var postLoginDataController = async(req,res)=>{
  try{
     var loginData= await loginService.postLoginDataService(req.body);
     if(loginData){
         res.json({ "message": loginData, "status": true })
     }
    
         else {
             res.json({ "message": "not got any data", "status": false })
           }
     
  }
  catch (error) {
     console.log(error);
     res.json({ "message": "internal Server error", "status": false })
 
   }
 }
module.exports={getLoginDataController,postLoginDataController}