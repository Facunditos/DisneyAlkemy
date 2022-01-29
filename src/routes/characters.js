const express = require("express")
const router=express.Router()

const charactersController = require("../controllers/charactersController")
const uploadImageCharacter=require("../middlewares/uploadImageCharacter")
const verifyToken=require("../middlewares/verifyToken")

router.get("/",verifyToken,charactersController.list)
router.get("/searchNombre",charactersController.searchNombre)
router.get("/searchEdad",charactersController.searchEdad)
router.get("/searchPelicula",charactersController.searchPelicula)
router.get("/new",charactersController.new)
router.post("/",uploadImageCharacter.single("imageCharacter"),charactersController.create)
router.get("/:id",charactersController.detail)
router.get("/:id/edit",charactersController.edit)
router.put("/:id",uploadImageCharacter.single("imageCharacter"),charactersController.update)
router.delete("/:id",charactersController.destroy)

module.exports=router
