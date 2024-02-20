var mongoose = require('mongoose');

var  Schema = mongoose.Schema;
var categoriesSchema = new Schema({
  
    category: {
        type: String,
        required: false,
    },
    subCategory: [
        
    ],
    type: [
        
    ],
    aminities:[ 
       
    ],
    location_offered: [{
        
    }]
});


module.exports = mongoose.model('categories', categoriesSchema);

