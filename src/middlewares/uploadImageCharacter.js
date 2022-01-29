const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const folder=path.join(__dirname,"../../public/img/characters-img")
        cb(null,folder)
    },
    filename:(req,file,cb)=>{
        const newFilename="character"+Date.now()+path.extname(file.originalname)
        cb(null,newFilename)
    }
})

const uploadImageCharacter=multer({storage:storage})

module.exports=uploadImageCharacter
