const router = require('express').Router();
const sequelize = require('../../database.js');
const jwt = require('jsonwebtoken');
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
    verificar_role,
    validarCompania,
    consulta_compania,
    nuevo_compania
} = require('../functions');

//ruta post para ingresar compañias



router.post('/', validarCompania, (req, res) => {

    nuevo_compania(req.body)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' Compañia agregada exitosamente'
        })).catch(err => console.log(err));
})






module.exports= router;  
