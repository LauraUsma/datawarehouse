const router = require('express').Router();
const sequelize = require('../../database.js');
const jwt = require('jsonwebtoken');
const jwtClave= "p40y3c70cu47r0_Ac4m1c4";
//const path = require('path');

const{    
    nuevo_usuario,
    consulta_usuario,
    login,
    buscar_usuarios,
    validarUsuario,
    usuarioExistente,
    roles_usuario,
    user_pass,
    verificar_role,
    consulta_usuario_ppal
} = require('../functions');

// Ruta Post para loguear el usuario despues de estar registrado


router.post('/',usuarioExistente, user_pass, (req, res) =>{
    let {email}= req.body;
    let perfilId_general=" ";  
    consulta_usuario_ppal(email)
        .then(proyects => {
            let usuarioNuevo = proyects.find(U => U.email == email)
             perfilId_general = usuarioNuevo.perfil_id;
            // console.log('perfilId_general adentr'+perfilId_general);
  
   
     

    let token = jwt.sign({email:email, perfil_id: perfilId_general}, jwtClave)
    res.status(200).send(
        {
            status: 200,
            mensaje: 'has iniciado- sesión',
            email : email,
            perfil_id : perfilId_general,
            token:token
   
        }
    )
});
})

 





 


module.exports= router;  














