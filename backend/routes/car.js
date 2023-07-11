const express = require("express")
const passport = require("passport")
const router = express.Router()
const carController = require("../controllers/car")

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post("/", upload.array('images', 12), carController.createCar);
router.get("/", carController.findCar);
router.get("/:id", carController.findOneCar);
router.put("/:id", upload.array('images', 12), passport.authenticate("jwt", { session: false }), carController.updateCar);
router.delete("/:id", passport.authenticate("jwt", { session: false }), carController.deleteCar);
router.get("/my_car/:id", passport.authenticate("jwt", { session: false }), carController.myCar);
router.post("/searchData", carController.searchData)

module.exports = router