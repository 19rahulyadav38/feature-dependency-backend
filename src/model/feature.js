const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
    {   
        id:{
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Feature', featureSchema);
