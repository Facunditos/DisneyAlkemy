module.exports=function(sequelize,dataType)  {
    let alias="Movie"
    let cols={
        id:{
            type:dataType.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allownull:false
        },
        imagen:{
            type:dataType.STRING(100),
            allownull:false
        },
        titulo:{
            type:dataType.STRING(50),
            allownull:false,
            unique:true
        },
        fecha_de_creacion:{
            type:dataType.DATE,
            allownull:false
        },
        calificacion:{
            type:dataType.INTEGER,
            allownull:false,
            validate:{min:1,max:5}
        },
        genero_id:{
            type:dataType.INTEGER,
            allownull:false
        }
    }
    let config={
        tableName:"peliculas",
        timestamps:false
    }
    let Movie=sequelize.define(alias,cols,config)
    
    Movie.associate=function (modelos) {
        Movie.belongsTo(modelos.Genre,{
            as:"Genre",
            foreignKey:"genero_id"
        }) 
        Movie.belongsToMany(modelos.Character,{
            as:"Characters",
            through:"personaje_pelicula",
            foreignKey:"pelicula_id",
            otherKey:"personaje_id",
            timestamps:false
            
        })   
    }
    
    return Movie
}