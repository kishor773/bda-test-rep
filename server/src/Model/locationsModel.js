var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var locationsSchema= new Schema({
    location_details:[
        {
            locationId:{
                type:Number,
                required:true
            },
            locationName:{
                type:String,
                required:true
            },
            coords:{
                latitude:{
                    type:Number,
                    required:true
                },
                longitude:{
                    type:Number,
                    required:true
                },
                speed:{
                    type:Number,
                    required:false
                },
                accuracy:{
                    type:Number,
                    required:false
                }
            },
            state:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            pincode:{
                type:Number,
                required:true
            },
            country:{
                type:String,
                required:true
            }
        }
    ]
        
    
})
module.exports=mongoose.model('locations',locationsSchema)