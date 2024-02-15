var categoriesService= require("../Service/categoriesService");
var getCategoriesDataController= async(req,res)=>{
try{
 var categoriesData= await (categoriesService.getCategoriesDataService());
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

var postCategoriesDataController=async(req,res)=>{
    try{
var categoriesData=await categoriesService.postCategoriesDataService(req.body);

if(categoriesData){
    res.status(200).send({"message":categoriesData,"status":true})
}
else{
    res.status(200).send({"message":"not able to post","status":false})
}
    }
    catch(error){
  console.log(error);
  res.status(500).send({"message":"internal storage error","status":false})
    }
}

var putCategoriesDataController= async(req,res)=>{
    try{
 var categoriesData= await categoriesService.putCategoriesDataService(req.params.categoryId,req.body);
 if(categoriesData){
        res.status(200).send({"message":categoriesData,"status":true});
 }else{
  res.status(200).send({"message":"not able to update","status":false});
 }
    }
    catch(error){
        console.log(error);
        res.status(500).send({"message":"internal Storage Error","status":false})
    }
}
module.exports={getCategoriesDataController,postCategoriesDataController,putCategoriesDataController}