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

router.put('/:id', (req, res) => {
    let{ id}=req.params;
    let{ nombre}=req.body;
    
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

async function obtenerTodasCIudades() {
    var queryString = '';


    queryString = queryString + ' SELECT cd.id,  cd.nombre as ciudad, ps.nombre as pais';
    queryString = queryString + ' from ciudades cd join paises ps on (cd.pais_id=ps.id) ';

   

    let ciudad = await sequelize.query(queryString,
     { type: sequelize.QueryTypes.SELECT})
    return ciudad;
 }

router.get('/', async(req , res)=>{

    let ciudades = await obtenerTodasCIudades();
  
    return res.status(200).json({ciudades})
 });
 
 
// ruta delete para eliminar ciudades

router.delete('/:id',(req,res)=>{
    let{ id}=req.params;

    sequelize.query(`DELETE FROM ciudades WHERE id=?`,{
        replacements:[id]
    })
    .then(proyects => res.status(200).send({
        status:'OK',
        mensaje:'Ciudad Eliminada'
    }))
    .catch(err=> console.log(err));
})


//***************obtener ciudad segun el pais**************** */

async function obtenerTodosLasCiudadesXpais(pais_id) {
    var queryString = '';

    console.log('ENTRE');
    queryString = queryString + ' SELECT cd.id,  cd.nombre as ciudad';
    queryString = queryString + ' from ciudades cd where  pais_id = ? ';

   

    let ciudad = await sequelize.query(queryString,
     {  type: sequelize.QueryTypes.SELECT,
        replacements:[pais_id]})
    return ciudad;
 }

 router.get('/:pais_id', async(req, res) => {
    let{ pais_id}=req.params;


    let ciudades = await obtenerTodosLasCiudadesXpais(pais_id);
  
    return res.status(200).json({ciudades})
   
})





module.exports= router;  


 
