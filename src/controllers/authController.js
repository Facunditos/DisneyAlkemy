const sgMail = require("@sendgrid/mail")

const authController={
    register:(req,res)=>{
        res.render("auth/register")
    },
    userRegister:(req,res)=>{
        sgMail.setApiKey("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")
        const msg = {
        to: req.body.email, 
        from: 'facundolopezcrespo@hotmail.com', 
        subject: 'Bienvenido/a a Disney',
        text: 'text',
        html: "<p>Bienvenido/a a Disney</p>"
        }
        sgMail
        .send(msg)
        .then(() => {
            res.redirect("/auth/login")
        })
        .catch(error => console.error(error))
        
    },
    login:(req,res)=>{
        res.send("loguear usuario")
    },
    auth:(req,res)=>{
        res.send("se loguea el usuario")
    }
}

module.exports=authController