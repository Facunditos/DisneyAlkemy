module.exports=function(sequelize,dataType)  {
    let alias="Genre"
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
        nombre:{
            type:dataType.STRING(50),
            allownull:false,
            unique:true
        }
    }
    let config={
        tableName:"generos",
        timestamps:false
    }
    let Genre=sequelize.define(alias,cols,config)
    Genre.associate=function (modelos) {
        Genre.hasMany(modelos.Movie,{
            as:"Movies",
            foreignKey:"genero_id"
        })  
    }
    return Genre
}