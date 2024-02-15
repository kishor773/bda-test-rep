var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var plansSchema= new Schema({
    planId:{
        type:Number,
        required:true
    },
    planName:{
        type:String,
        required:true
    },
    planPrice:{
        type:Number,
        required:true
    },
    planValidity:{
        type:Number,
        required:true
    },
    planStartDate:{
        type:Date,
        required:true
    },
    planEndDate:{
        type:Date,
        required:true
    }
})

module.exports=mongoose.model('plans',plansSchema)