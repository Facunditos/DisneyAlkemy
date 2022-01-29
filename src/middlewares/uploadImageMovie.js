const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const folder=path.join(__dirname,"../../public/img/movies-img")
        cb(null,folder)
    },
    filename:(req,file,cb)=>{
        const newFilename="movie"+Date.now()+path.extname(file.originalname)
        cb(null,newFilename)
    }
})

const uploadImageMovie=multer({storage:storage})

module.exports=uploadImageMovie
