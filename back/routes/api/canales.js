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
    buscar_compañia,
    validarCompania,
    consulta_compania,
    nuevo_compania,
    nuevo_contacto,
    validarContacto,
    nuevo_canal
} = require('../functions');


//**************ruta get para canales*************** */
async function obtenerCanales() {
    var queryString = '';


    queryString = queryString + ' SELECT cd.id,  cd.canal as canal FROM canales cd ';
    
    let canales_result = await sequelize.query(queryString,
     { type: sequelize.QueryTypes.SELECT})
    return canales_result;
 }

router.get('/', async(req , res)=>{

    let canales = await obtenerCanales();
  
    return res.status(200).json({canales})
  
 });

//*****************ruta post******************* */
 router.post('/', (req, res) => {

    nuevo_canal(req.body)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' Canal creado con exito'
        })).catch(err => console.log(err));
})








module.exports= router;  
