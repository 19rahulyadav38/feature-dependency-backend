const mongoose = require('mongoose');

const linksSchema = new mongoose.Schema(
    {

        source: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        sourceName: {
            type: String,
            required: true
        },
        sourceId: {
            type: Object,
            required: true
        },
        targetName: {
            type: String,
            required: true
        },
        targetId: {
            type: Object,
            required: true
        }
    }
)

module.exports = mongoose.model('Links', linksSchema);