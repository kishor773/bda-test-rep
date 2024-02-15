var notificationsModel= require("../Model/notificationsModel");

module.exports.getNotificationsDataService= async()=>{
 try{
 var data= await notificationsModel.find({})
 return data
 }
 catch(error){
    console.log(error);
    return error
 }
}

module.exports.postNotificationsDataService= async(notificationsDetails)=>{
    try{
       var notificationsModelData = new notificationsModel();
notificationsModelData.email = notificationsDetails.email;
notificationsModelData.phone = notificationsDetails.phone;
notificationsModelData.searchBroadcast = notificationsDetails.searchBroadcast.map(notifications => ({
    searchBroadcastId: notifications.searchBroadcastId,
    notificationFlag: notifications.notificationFlag,
    serviceName: notifications.serviceName,
    locationName: notifications.locationName,
}));
notificationsModelData.searchNotification = notificationsDetails.searchNotification.map(notifications => ({
    name: notifications.name,
    phone: notifications.phone,
    email: notifications.email,
    serviceName: notifications.serviceName,
    searchDateTime: 
        notifications.searchDateTime
    
}));

        var data = await notificationsModelData.save();
        return data
    }
    catch(error){
        console.log(error);
        return error
    }
}

module.exports.putNotificationsDataService= async(searchBroadcastId,notificationsDetails)=>{
try{
    const filter ={
        'searchBroadcast.searchBroadcastId':searchBroadcastId,
    }
var data = await notificationsModel.updateOne(filter,notificationsDetails);
return data
}
catch(error){
    console.log(error);
    return error
}
}