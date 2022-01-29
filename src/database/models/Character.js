module.exports=function(sequelize,dataType)  {
    let alias="Character"
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
            type:dataType.STRING(40),
            allownull:false,
            unique:true
        },
        edad:{
            type:dataType.INTEGER,
            allownull:false
        },
        peso:{
            type:dataType.DECIMAL(3,1),
            allownull:false
        },
        historia:{
            type:dataType.TEXT,
            allownull:false
        }
    }
    let config={
        tableName:"personajes",
        timestamps:false
    }
    let Character=sequelize.define(alias,cols,config)
    Character.associate=function (modelos) { 
        Character.belongsToMany(modelos.Movie,{
            as:"Movies",
            through:"personaje_pelicula",
            foreignKey:"personaje_id",
            otherKey:"pelicula_id",
            timestamps:false
        })   
    }
    return Character
}

