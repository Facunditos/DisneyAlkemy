const express = require("express")
const router=express.Router()

const authController = require("../controllers/authController")

router.get("/register",authController.register)
router.post("/register",authController.userRegister)
router.get("/login",authController.login)
router.post("/login",authController.auth)

module.exports=router