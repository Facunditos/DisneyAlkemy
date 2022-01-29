const express = require("express")
const router=express.Router()

const moviesController = require("../controllers/moviesController")
const uploadImageMovie=require("../middlewares/uploadImageMovie")
const verifyToken=require("../middlewares/verifyToken")
router.get("/",verifyToken,moviesController.list)
router.get("/searchTitulo",moviesController.searchTitulo)
router.get("/searchGenero",moviesController.searchGenero)
router.get("/new",moviesController.new)
router.post("/",uploadImageMovie.single("imageMovie"),moviesController.create)
router.get("/:id",moviesController.detail)
router.get("/:id/edit",moviesController.edit)
router.put("/:id",uploadImageMovie.single("imageMovie"),moviesController.update)
router.delete("/:id",moviesController.destroy)

module.exports=router