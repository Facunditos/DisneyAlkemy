const db=require("../database/models/index")
const Op = db.Sequelize.Op;
const path=require("path")
const fs= require("fs")
const movieImagePath=path.join(__dirname,"../../public/img/movies-img")



const moviesController={
    list:(req,res)=>{
        const promesaGeneros=db.Genre.findAll()
        const promesaPeliculas=db.Movie.findAll()
        Promise.all([promesaGeneros,promesaPeliculas])
        .then(resultados=>{
            const generos=resultados[0]
            const peliculas=resultados[1]
            res.render("movies/list",{generos,peliculas})
        })
        .catch(error=>console.log(error))
    },
    searchTitulo:(req,res)=>{
        const promesaPeliculas=db.Movie.findAll(
            {
                where: {
                    titulo: { [Op.like]: "%"+req.query.titulo+"%"}
                }
            ,
                order: [
                    ["titulo", req.query.order]
                ]
            }
        )
        const promesaGeneros=db.Genre.findAll()
        Promise.all([promesaPeliculas,promesaGeneros])
        .then(resultados=>{
            const peliculas=resultados[0]
            const generos=resultados[1]
            res.render("movies/list",{peliculas,generos})
        })
        .catch(error=>console.log(error))
    },
    searchGenero:(req,res)=>{
        const promesaPeliculas=db.Movie.findAll(
            {
                where: {
                    genero_id: req.query.genero_id
                }
            ,
                order: [
                    ["titulo", req.query.order]
                ]
            }
        )
        const promesaGeneros=db.Genre.findAll()
        Promise.all([promesaPeliculas,promesaGeneros])
        .then(resultados=>{
            const peliculas=resultados[0]
            const generos=resultados[1]
            res.render("movies/list",{peliculas,generos})
        })
        .catch(error=>console.log(error))
    },
    new:(req,res)=>{
        db.Genre.findAll()
        .then(generos=>{
            res.render("movies/new",{generos})
        })
        .catch(error=>console.log(error))
    },
    create:(req,res)=>{
        db.Movie.create({
            ...req.body,
            imagen:req.file.filename
        })
        .then(resultado=>{
            res.redirect("/movies")
        })
        .catch(error=>console.log(error))
    },
    detail:(req,res)=>{
        db.Movie.findByPk(req.params.id,{
            include:[
                {association:"Genre"},
                {association:"Characters"}
            ]
        })
        .then(pelicula=>{
            
            res.render("movies/detail",{pelicula})  
        })
        .catch(error=>console.log(error))
    },
    edit:(req,res)=>{
        const promesaGeneros=db.Genre.findAll()
        const promesaPelicula=db.Movie.findByPk(req.params.id,{
            include:[
                {association:"Genre"}
            ]
        })
        Promise.all([promesaGeneros,promesaPelicula])
        .then(resultados=>{
          const generos=resultados[0]
          const pelicula=resultados[1]  
          res.render("movies/edit",{generos,pelicula})  
        })
        .catch(error=>console.log(error))
    },
    update:(req,res)=>{
        db.Movie.findByPk(req.params.id)
        .then(peliculaEditandose=>{
            if (req.file) {
                fs.rmSync(path.resolve(movieImagePath,peliculaEditandose.imagen))
            }
            const peliculaEditada={
                ...req.body,
                imagen:req.file?req.file.filename:peliculaEditandose.imagen
            }
            return peliculaEditada
        })
        .then(peliculaEditada=>{
            db.Movie.update(peliculaEditada,{
                where:{
                    id:req.params.id
                }
            })
            .then(resultado=>{
                res.redirect("/movies")
            })
        })
        .catch(error=>console.log(error))
    },
    destroy:(req,res)=>{
        db.Movie.findByPk(req.params.id,{include:[{association:"Characters"}]})
        .then(pelicula=>{
            fs.rmSync(path.resolve(movieImagePath, pelicula.imagen))
            return  pelicula.setCharacters([])
        })
        .then(resultado=>{
            db.Movie.destroy({
                where:{
                    id:req.params.id
                }
            })
            .then(resultado=>{
                res.redirect("/movies")
            })
        })
        .catch(error=>console.log(error)) 
    }
}

module.exports=moviesController