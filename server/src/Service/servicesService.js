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
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.servicesSortBy = async (id) => {
    try {
        var data = await servicesModel.find({}).sort({ avgRatings: -1 });
        // var data = await servicesModel.aggregate([{ $sort: { avgRatings: 1 }}]);
        return data;
    } catch (error) {
        console.log('services-sort-by-error', error);
        throw error;
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
            _id
        }
        const update = {
            $set: servicesDetails
        };

        var data = await servicesModel.updateOne(filter, update);
        return data

    }
    catch (error) {
        console.log(error);
        return error
    }
}
