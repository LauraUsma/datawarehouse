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
    nuevo_pais,
    consulta_pais,
    validarPais

} = require('../functions');

//ruta post para ingresar regiones

router.post('/', validarPais, (req, res) => {

    nuevo_pais(req.body)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' País agregado exitosamente'
        })).catch(err => console.log(err));
})

//ruta put para actualizar paises

router.put('/', (req, res) => {
    let{ id, nombre}=req.body;
    
       sequelize.query(`UPDATE paises SET nombre= ? WHERE id = ?`, {
               replacements: [nombre, id]
           })
           .then(proyects => res.status(200).send({
               status: 'OK',
               mensaje: 'Pais Actualizado'
           }))
           .catch(err => console.log(err));
   })



// rut get para mostrar paises

router.get('/', (req , res)=>{

    sequelize.query('SELECT * FROM paises', {type:sequelize.QueryTypes.SELECT})
     .then(function (paises){
         console.log(paises);
         res.send(paises);
     }).catch(err =>console.error(err));
 });
 
 
// ruta delete para eliminar regiones

router.delete('/',(req,res)=>{
    let{ id}=req.body;

    sequelize.query(`DELETE FROM paises WHERE id=?`,{
        replacements:[id]
    })
    .then(proyects => res.status(200).send({
        status:'OK',
        mensaje:'País Eliminado'
    }))
    .catch(err=> console.log(err));
})
   




 
   





module.exports= router;  
