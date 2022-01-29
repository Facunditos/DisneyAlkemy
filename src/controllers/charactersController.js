const db=require("../database/models/index")
const Op = db.Sequelize.Op;
const path=require("path")
const fs= require("fs")
const characterImagePath=path.join(__dirname,"../../public/img/characters-img")

const charactersController={
    list:(req,res)=>{
        const promesaActor=db.Character.findAll()
        const promesaPeliculas=db.Movie.findAll()
        Promise.all([promesaActor,promesaPeliculas])
        .then(resultados=>{
            const actores=resultados[0]
            const peliculas=resultados[1]
            res.render("characters/list",{actores,peliculas})
        })
        .catch(error=>console.log(error))
    },
    searchNombre:(req,res)=>{
        const promesaActor=db.Character.findAll({
            where: {
              nombre: { [Op.like]: "%"+req.query.nombre+"%" }
            }
        })
        const promesaPeliculas=db.Movie.findAll()
        Promise.all([promesaActor,promesaPeliculas])
        .then(resultados=>{
            const actores=resultados[0]
            const peliculas=resultados[1]
            res.render("characters/list",{actores,peliculas})
        })
        .catch(error=>console.log(error))
    },
    searchEdad:(req,res)=>{
        const promesaActor= db.Character.findAll({
            where: {
              edad:{[Op.eq]:req.query.edad}
            }
        })
        const promesaPeliculas=db.Movie.findAll()
        Promise.all([promesaActor,promesaPeliculas])
        .then(resultados=>{
            const actores=resultados[0]
            const peliculas=resultados[1]
            res.render("characters/list",{actores,peliculas})
        })
        .catch(error=>console.log(error))
    },
    searchPelicula:(req,res)=>{
        const promesaPelicula=db.Movie.findByPk(
            req.query.pelicula_id,
            {include:[{association:"Characters"}]}
        )
        const promesaPeliculas=db.Movie.findAll()
        Promise.all([promesaPelicula,promesaPeliculas])
        .then(resultados=>{
            const actoresPelicula=resultados[0].Characters
            const peliculas=resultados[1]
            
            res.render("characters/list",{actores:actoresPelicula,peliculas})
        })
        .catch(error=>console.log(error))
    },
    new:(req,res)=>{
        db.Movie.findAll()
        .then(peliculas=>{
            res.render("characters/new",{peliculas})
        })
        .catch(error=>console.log(error))
    },
    create:(req,res)=>{
        db.Character.create({
            ...req.body,
            imagen:req.file.filename
        })
        .then(personajeCreado=>{
            let arrayId_Peliculas=req.body.pelicula_id
            let arrayValidoId_Peliculas=arrayId_Peliculas.filter(pelicula_id=>pelicula_id!="")
            personajeCreado.setMovies(arrayValidoId_Peliculas)
            res.redirect("/characters")
        })
        .catch(error=>console.log(error))
    },
    detail:(req,res)=>{
        db.Character.findByPk(req.params.id,{include:[{association:"Movies"}]})
        .then(actor=>{
            res.render("characters/detail",{actor})  
        })
        .catch(error=>console.log(error))
    },
    edit:(req,res)=>{
        const promesaActor=db.Character.findByPk(req.params.id,{include:[{association:"Movies"}]})
        const promesaPeliculas=db.Movie.findAll()
        Promise.all([promesaActor,promesaPeliculas])
        .then(resultados=>{
          const actor=resultados[0]
          const peliculas=resultados[1]  
          res.render("characters/edit",{actor,peliculas})  
        })
    },
    update:(req,res)=>{
        db.Character.findByPk(req.params.id)
        .then(actorEditandose=>{
            if (req.file) {
                fs.rmSync(path.resolve(characterImagePath,actorEditandose.imagen))
            }
            let arrayId_Peliculas=req.body.pelicula_id
            let arrayValidoId_Peliculas=arrayId_Peliculas.filter(pelicula_id=>pelicula_id!="")
            actorEditandose.setMovies(arrayValidoId_Peliculas)
            const actorEditado={
                ...req.body,
                imagen:req.file?req.file.filename:actorEditandose.imagen
            }
            return actorEditado
        })
        .then(actorEditado=>{
            db.Character.update(actorEditado,{
                where:{
                    id:req.params.id
                }
            })
            .then(resultado=>{
                res.redirect("/characters")
            })
        })
        .catch(error=>console.log(error))
        
    },
    destroy:(req,res)=>{
        db.Character.findByPk(req.params.id,{include:[{association:"Movies"}]})
        .then(actor=>{
            fs.rmSync(path.resolve(characterImagePath, actor.imagen))
            return  actor.setMovies([])
        })
        .then(resultado=>{
            db.Character.destroy({
                where:{
                    id:req.params.id
                }
            })
            .then(resultado=>{
                res.redirect("/characters")
            })
        })
        .catch(error=>console.log(error))    
    }
}

module.exports=charactersController