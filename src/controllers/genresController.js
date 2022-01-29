const db=require("../database/models/index")


const genresController={
    list:(req,res)=>{
        db.Genre.findAll()
        .then(generos=>{
            res.render("genres/list",{generos})
        })
        .catch(error=>console.log(error))
    },
    new:(req,res)=>{
        res.render("genres/new")
    },
    create:(req,res)=>{
        db.Genre.create({
            ...req.body,
            imagen:req.file.filename
        })
        .then(resultado=>{
            res.redirect("/movies/new")
        })
        .catch(error=>console.log(error))
    }
}

module.exports=genresController