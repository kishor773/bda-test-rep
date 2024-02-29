var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var locationsSchema= new Schema({
    email:{
        type:String,
        required:false,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },

    recentlocations:[
        {
            locationId:{
                type:Number,
                required:false
            },
            locationName:{
                type:String,
                required:false
            },
            coords:{
                latitude:{
                    type:Number,
                    required:false
                },
                longitude:{
                    type:Number,
                    required:false
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
                required:false
            },
            city:{
                type:String,
                required:false
            },
            pincode:{
                type:Number,
                required:false
            },
            country:{
                type:String,
                required:false
            }
        }
    ]
        
    
})
module.exports=mongoose.model('locations',locationsSchema)