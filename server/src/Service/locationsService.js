var locationsModel = require('../Model/locationsModel');

module.exports.getLocationsDataService = async () => {
    try {
        var locationsData = await locationsModel.find({});
        return locationsData;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
module.exports.postLocationsDataService = async (locationData) => {
    try {
        var locationsModelData = new locationsModel();
        locationsModelData.email = locationData.email,
            locationsModelData.name = locationData.name,
            locationsModelData.phone = locationData.phone,
            locationsModelData.recentlocations = locationData.recentlocations.map(location => ({
                locationId: location.locationId,
                locationName: location.locationName,
                coords: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    speed: location.coords.speed,
                    accuracy: location.coords.accuracy
                },
                state: location.state,
                city: location.city,
                pincode: location.pincode,
                country: location.country
            }));
        var data = await locationsModelData.save();
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
module.exports.putLocationsDataService = async (_id, locationsData) => {
    // console.log(locationId, locationsData);
    try {
        const filter = {
            '_id': _id,
        }
        const options = { new: true }
        var data = await locationsModel.findOneAndUpdate(filter, locationsData, options);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}