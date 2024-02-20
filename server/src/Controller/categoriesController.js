var categoriesService= require("../Service/categoriesService");
var getCategoriesDataController= async(req,res)=>{
try{
 var categoriesData= await (categoriesService.getCategoriesDataService());
 if(categoriesData){
    console.log(categoriesData)
    res.json({"message":categoriesData,"status":true})
 }
 else{
    res.json({"message":"not got any data","status":false})
 }
}
catch(error){
console.log(error);
res.json({"message":"Internal Storage Error","status":false})
}
}


var getCategoriesIdDataController = async(req,res)=>{
    try{
        var CategoriesData= await categoriesService.getCategoriesIdDataService(req.params._id,req.body);

        if(CategoriesData){
           res.status(200).send({"message":CategoriesData,"status":true})
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

var getCategoriesNameDataController = async(req,res)=>{

   
    try{
        var CategoriesData= await categoriesService.getCategoriesNameDataService(req.body);

        if(CategoriesData){
           res.status(200).send({"message":CategoriesData,"status":true})
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

var postCategoriesDataController=async(req,res)=>{
    try{
var categoriesData=await categoriesService.postCategoriesDataService(req.body);
console.log(categoriesData,"dddddddd")
if(categoriesData){
    res.json({"message":categoriesData,"status":true})
}
else{
    res.json({"message":"not able to post","status":false})
}
    }
    catch(error){
  console.log(error);
  res.json({"message":"internal storage error","status":false})
    }
}

var putCategoriesDataController= async(req,res)=>{
    try{
 var categoriesData= await categoriesService.putCategoriesDataService(req.params._id,req.body);
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
module.exports={getCategoriesDataController,postCategoriesDataController,putCategoriesDataController, getCategoriesIdDataController, getCategoriesNameDataController}