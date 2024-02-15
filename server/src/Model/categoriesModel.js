const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categoriesSchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    aminities: {
        type: String,
        required: true,
    },
    location_offered: {
        type: String,
        required: true,
    }
});

// Apply the auto-increment plugin to your schema
categoriesSchema.plugin(AutoIncrement, { inc_field: 'categoryId' ,start_seq: 0});



const categoriesModel = mongoose.model('categories', categoriesSchema);


module.exports = categoriesModel;
