var servicesModel = require('../Model/servicesModel');

module.exports.getServicesDataService = async () => {
    try {
        var data = await servicesModel.find({});
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.getServicesIdDataService = async (id) => {
    try {
        var data = await servicesModel.findById(id);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports.getServByCategName = async (name) => {
    try {
        var data = await servicesModel.find({ categoryName: name })
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        // throw new Error(error);
        return error
    }
}

module.exports.servicesSortBy = async (id) => {
    try {
        var data = await servicesModel.find({}).sort({ avgRatings: -1 });
        // var data = await servicesModel.aggregate([{ $sort: { avgRatings: 1 }}]);
        return data;
    } catch (error) {
        console.log('services-sort-by-error', error);
        return error;
    }
};

module.exports.postServicesDataService = async (servicesDetails) => {

    try {
        var data = await servicesModel.create(servicesDetails);
        return data

    }
    catch (error) {
        console.log(error);
        return error
    }
}
module.exports.putServicesDataService = async (_id, servicesDetails) => {

    try {
        const filter = {
            _id: _id
        }
        const update = {
            $set: servicesDetails
        };

        var data = await servicesModel.updateOne(filter, servicesDetails);
        console.log('data-update-one----', data);

        return data

    }
    catch (error) {
        console.log(error);
        return error
    }
}
// db.collection.update(
//     { _id: ObjectId("57315ba4846dd82425ca2408") },
//     { $pull: { "myarray.userId": ObjectId("570ca5e48dbe673802c2d035") } }
// )
module.exports.putServicesDataServiceInExistingArray = async (id, servicesDetls) => {

    try {
        const filter = {
            _id: id
        }
        const update = {
            $push: { serviceDetails: servicesDetls }
        };

        var data = await servicesModel.update({ _id: id }, { $push: { serviceDetails: servicesDetls } });
        console.log('data----', data);
        return data

    }
    catch (error) {
        console.log(error);
        return error
    }
}

module.exports.filterSerBasedOnCatDataService = async (filterData) => {
    console.log(filterData)
    let catName=filterData.categoryName ? filterData.categoryName : null
    let subCat1 = filterData.subCategory ? filterData.subCategory : null;
    let subCat2 = filterData.type ? filterData.type : null;
    let subCat3 = filterData.aminities ? filterData.aminities : null
    try {
        
        const filter = [
            {
                $unwind: "$serviceDetails"
            },
            {
                $match: {
                    "categoryName": catName,
                    $or: [
                        { "serviceDetails.subCategory1.name": subCat1 },
                        { "serviceDetails.subCategory2.name": subCat2 },
                        { "serviceDetails.subCategory3.name": subCat3 }
                    ]
                }
            },
            {
                $group: {
                    _id: "$_id",
                    matchedServiceDetails: { $push: "$serviceDetails" },
                    
                }
            },
            {
                $group: {
                    _id: null,
                    allMatchedServiceDetails: { $push: "$matchedServiceDetails" },
                   
                }
            },
           
            {
                $project: {
                    _id: 0,
                    allMatchedServiceDetails: 1
                }
            },
            
        ]

        var data = await servicesModel.aggregate(filter);
        console.log(data)
        return data
    }
    catch (error) {
        console.log(error);
        return error
    }
}

module.exports.getServicesByServiceDetailsIdDataService = async (id) => {
    try {
        var data = await servicesModel.findOne({ 'serviceDetails._id': id }, { 'serviceDetails.$': 1 }).exec();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};