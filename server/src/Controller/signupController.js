var signupService=require('../Service/signupservice');
var postSignupDatacontroller= async(req,res)=>{
    try{
        var signupData= await signupService.postSignupDataService(req.body);

        if(signupData){
           res.status(200).send({"message":signupData,"status":true})
        }
        else{
           res.status(200).send({"message":"not able to put data","status":false})
        }
    }
    catch(error){
       console.log(error);
       res.status(500).send({"message":"internal storage error","status":false})
    }
   }

   module.exports={postSignupDatacontroller}