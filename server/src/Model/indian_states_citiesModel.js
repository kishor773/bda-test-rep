const mongoose = require('mongoose');
var Schema=mongoose.Schema;
var stateCitySchema= new Schema({
    city:{
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    lng:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    iso2:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
    

})
module.exports=mongoose.model('indian_states_cities',stateCitySchema)