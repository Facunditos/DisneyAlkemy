const express = require("express")
const router=express.Router()

const genresController = require("../controllers/genresController")
const uploadImageGenre=require("../middlewares/uploadImageGenre")

router.get("/",genresController.list)
router.get("/new",genresController.new)
router.post("/",uploadImageGenre.single("imageGenre"),genresController.create)

module.exports=router
