var categoriesModel=require('../Model/categoriesModel');
module.exports.getCategoriesDataService= async()=>{
    try{
        var categoriesData= await categoriesModel.find({});
        return categoriesData
    }
    catch(error){
        console.log(error);
        return error;
    }
}

module.exports.postCategoriesDataService=async(categoriesDetails)=>{
    try{
        var categoriesModelData= new categoriesModel();
        
        categoriesModelData.category=categoriesDetails.category;
        categoriesModelData.subCategory=categoriesDetails.subCategory;
        categoriesModelData.type=categoriesDetails.type;
        categoriesModelData.aminities=categoriesDetails.aminities;
        categoriesModelData.location_offered=categoriesDetails.location_offered;
var categoriesData= await categoriesModelData.save();
return categoriesData;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

module.exports.putCategoriesDataService =async(categoriesid,categoriesDetails)=>{
   try{
    const filter={
        categoryId:categoriesid
    }
  var categoriesData= await categoriesModel.updateOne(filter,categoriesDetails);
      return categoriesData;
   }
   catch(error){
 console.log(error);
 return error;
   }
}