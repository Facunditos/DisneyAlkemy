let express=require("express")
const app=express()
const path=require("path")

const mainRouter=require("./routes/main")
const moviesRouter=require("./routes/movies")
const charactersRouter=require("./routes/characters")
const genresRouter=require("./routes/genres")
const authRouter=require("./routes/auth")
  

app.use(express.static(path.join(__dirname,"../public")))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use("/",mainRouter)
app.use("/movies",moviesRouter)
app.use("/characters",charactersRouter)
app.use("/genres",genresRouter)
app.use("/auth/",authRouter)


app.listen(3022,()=>console.log("el servidor se levantó en el puerto 3022"))

