const router = require('express').Router();
const sequelize = require('../../database.js');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
const jwtClave= "p40y3c70cu47r0_Ac4m1c4";


const{    
    nuevo_usuario,
    consulta_usuario,
    login,
    buscar_usuarios,
    validarUsuario,
    usuarioExistente,
    roles_usuario,
    user_pass,
    verificar_role
} = require('../functions');

//ruta post para registrar usuarios

router.post('/', validarUsuario,  (req, res) => {


    let token = (req.headers.authorization).split(' ')[1];
    let decodificado = jwt.verify(token, jwtClave);
    const usuario= decodificado.email;
 
    consulta_usuario(usuario)
    .then(arrayUsuarios =>{
        let user = arrayUsuarios.find(Usuario => Usuario.email == usuario)
        if(user.perfil_id === 1){
            nuevo_usuario(req.body)
            .then(proyects => res.status(200).send({
                status: 200,
                mensaje: ' Usuario agregado exitosamente'
            })).catch(err => console.log(err));
            
        } else {
            res.status(403).send({
                status:403,
                mensaje:'solo el Administrador puede realizar esta acción'
            })
        }
    })

   
})





module.exports=  router;  