const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Please fill brand']

    },
    manufacturing_year: {
        type: Number,
        required: [true, 'Please fill manufacturing year']

    },
    model: {
        type: String,
        required: [true, 'Please fill model']

    },
    fuel_type: {
        type: String,
        required: [true, 'Please fill fuel type']

    },
    kms_driven: {
        type: Number,
        required: [true, 'Please fill kms_driven']

    },
    engine_capacity: {
        type: Number,
        required: [true, 'Please fill engine capacity']

    },
    spare_key: {
        type: String,
        required: [true, 'Please fill spare key']

    },
    ownership: {
        type: String,
        required: [true, 'Please fill ownership']

    },
    Insurance: {
        type: String,
        required: [true, 'Please fill Insurance']

    },
    register_number: {
        type: String,
        required: [true, 'Please fill register number']
    },
    userId: {
        type: mongoose.Schema.ObjectId
    },
    imgUrl: {
        type: Array
    },
    contect_number: {
        type: Number,
        required: [true, 'Please fill contect number'],
        min: 10
    },
}, { timestamps: true }

)

module.exports = mongoose.model("car", carSchema)