const mongoose = require("mongoose");
const carSchema = require("../model/car")
const userSchema = require("../model/user")

exports.createCar = async (req, res) => {
    try {
        let imgUrl = []

        let car_data = JSON.parse(req.body.car_details)

        req.files.forEach(element => {
            imgUrl.push(element.path)
        });

        car_data.imgUrl = imgUrl

        let data = await carSchema.create(car_data)
        res.json({
            message: "Car details added successfully",
            data
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: error.message });
        } else {
            res.status(404).json({ message: "Something went wrong!" });
        }
    }
}

exports.findCar = async (req, res) => {
    try {
        let data = await carSchema.find()
        res.json({
            message: "Get all Cars",
            length: data.length,
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}

exports.findOneCar = async (req, res) => {

    try {
        let data = await carSchema.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "carId",
                    as: "commentList",
                }
            }
        ])
        res.json({
            message: "Get One Car",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}


exports.updateCar = async (req, res) => {
    try {
        let car_data = JSON.parse(req.body.car_details)
        let data = await carSchema.findByIdAndUpdate(req.params.id, car_data)
        res.json({
            message: "Car details updated successfully",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}

exports.deleteCar = async (req, res) => {
    try {
        let data = await carSchema.findByIdAndDelete(req.params.id)
        res.json({
            message: "Car deleted successfully",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }

}

exports.myCar = async (req, res) => {
    try {
        let data = await userSchema.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            }, {
                $lookup: {
                    from: "cars",
                    localField: "_id",
                    foreignField: "userId",
                    as: "myCar"
                }
            }
        ])

        res.json({
            message: "Get My Car",
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}

exports.searchData = async (req, res, next) => {
    try {
        const data = await carSchema.find({ $or: [{ "brand": { $regex: req.body.search } }, { "model": { $regex: req.body.search } }] });
        res.json({
            message: "search car successfully",
            length: data.length,
            data
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong!" });
    }
}