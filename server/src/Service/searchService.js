var searchModel = require('../Model/searchModel')

module.exports.getSearchDataService = async () => {

    try {
        var data = await searchModel.find({});
        return data
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.postSearchDataService = async (searchDetails) => {
    try {
        var data = await searchModel.create(searchDetails);
        return data
    }
    catch (error) {
        console.log(error);
        return error
    }
}

module.exports.putSearchDataService = async (_id, searchDetails) => {
    try {
        const filter = {
            '_id': _id
        }
        var data = await searchModel.updateOne(filter, searchDetails);
        return data;
    }
    catch (error) {
        console.log(error)
        return error
    }
}

module.exports.getSearchEmailDataService = async (email) => {

    try {
        var data = await searchModel.find({ email: email });
        return data
    }
    catch (error) {

        return error;
    }
}