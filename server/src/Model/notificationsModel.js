var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var notificationsSchema= new Schema({
 email:{
    type:String,
    required:true
 },
 phone:{
    type:String,
    required:true
 },
 searchBroadcast:[
    {
        searchBroadcastId:{
            type:Number,
            required:true
        },
        notificationFlag:{
            type:Boolean,
            required:true
        },
        serviceName:{
            type:String,
            required:true
        },
        locationName:{
            type:String,
            required:true
        }
    }
 ],
 searchNotification:[
    {
        name:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        serviceName:{
            type:String,
            required:true
        },
        searchDateTime:
        {
            type:Date,
            required:true
        }
    }
 ]

})



module.exports=mongoose.model('notifications',notificationsSchema)