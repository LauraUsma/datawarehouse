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
    nuevo_compania,
    nueva_ciudad,
    consulta_ciudad,
    validarCiudad

} = require('../functions');

//ruta post para ingresar ciudades

router.post('/', validarCiudad, (req, res) => {

    nueva_ciudad(req.body)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' Ciudad agregada exitosamente'
        })).catch(err => console.log(err));
})

//ruta put para actualizar ciudades

router.put('/', (req, res) => {
    let{ id, nombre}=req.body;
    
       sequelize.query(`UPDATE ciudades SET nombre= ? WHERE id = ?`, {
               replacements: [nombre, id]
           })
           .then(proyects => res.status(200).send({
               status: 'OK',
               mensaje: 'Ciudad Actualizada'
           }))
           .catch(err => console.log(err));
   })



// rut get para mostrar ciudades

router.get('/', (req , res)=>{

    sequelize.query('SELECT * FROM ciudades', {type:sequelize.QueryTypes.SELECT})
     .then(function (ciudades){
         console.log(ciudades);
         res.send(ciudades);
     }).catch(err =>console.error(err));
 });
 
 
// ruta delete para eliminar ciudades

router.delete('/',(req,res)=>{
    let{ id}=req.body;

    sequelize.query(`DELETE FROM ciudades WHERE id=?`,{
        replacements:[id]
    })
    .then(proyects => res.status(200).send({
        status:'OK',
        mensaje:'Ciudad Eliminada'
    }))
    .catch(err=> console.log(err));
})
   




 
   





module.exports= router;  
