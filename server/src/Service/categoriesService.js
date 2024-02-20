var categoriesModel=require('../Model/categoriesModel');
module.exports.getCategoriesDataService= async()=>{
    try{
        var categoriesData= await categoriesModel.find({});
        return categoriesData;
        
    }
    catch(error){
        console.log(error);
        return error;
    }
}

module.exports.postCategoriesDataService=async(categoriesDetails)=>{
    try{
        var categoriesData= new categoriesModel();
 
        categoriesData.category=categoriesDetails.category;
        categoriesData.subCategory=categoriesDetails.subCategory;
        categoriesData.type=categoriesDetails.type;
        categoriesData.aminities=categoriesDetails.aminities;
        categoriesData.location_offered=categoriesDetails.location_offered;
var data= await categoriesData.save();
return data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}


// module.exports.putCategoriesDataService =async(categoriesid,categoriesDetails)=>{
//    try{
//     const filter={
//         categoryId:categoriesid
//     }
//   var categoriesData= await categoriesModel.updateOne(filter,categoriesDetails);
//       return categoriesData;
//    }
//    catch(error){
//  console.log(error);
//  return error;
//    }
// }

module.exports.putCategoriesDataService =async(_id,categoriesDetails)=>{
    try{
     const filter={
        _id:_id
     }
   var categoriesData= await categoriesModel.updateOne(filter,categoriesDetails);
       return categoriesData;
    }
    catch(error){
  console.log(error);
  return error;
    }
 }


 module.exports.getCategoriesIdDataService = async (id) => {
    try {
        var data = await categoriesModel.findById(id);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.getCategoriesNameDataService = async (catName) => {
    console.log(catName)
    try {
        var data = await categoriesModel.find(catName);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};