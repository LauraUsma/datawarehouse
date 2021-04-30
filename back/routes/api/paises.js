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

router.put('/:id', (req, res) => {
    let{ id}=req.params;
    let{ nombre}=req.body;

    
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

async function obtenerTodosLosPaises() {
    var queryString = '';

    console.log('ENTRE');
    queryString = queryString + ' SELECT ps.id,  ps.nombre as pais, rg.nombre as region';
    queryString = queryString + ' from paises ps join regiones rg on (ps.region_id=rg.id) ';

   

    let paises = await sequelize.query(queryString,
     { type: sequelize.QueryTypes.SELECT})
    return paises;
 }

 router.get('/', async(req, res) => {
  


    let pais = await obtenerTodosLosPaises();
  
    return res.status(200).json({pais})
   
})


 
// ruta delete para eliminar regiones

router.delete('/:id',(req,res)=>{
    let{ id}=req.params;

    sequelize.query(`DELETE FROM paises WHERE id=?`,{
        replacements:[id]
    })
    .then(proyects => res.status(200).send({
        status:'OK',
        mensaje:'País Eliminado'
    }))
    .catch(err=> console.log(err));
})
   
//***************obtener paises segun la region**************** */

async function obtenerTodosLosPaisesXRegion(region_id) {
    var queryString = '';

    console.log('ENTRE');
    queryString = queryString + ' SELECT ps.id,  ps.nombre as pais';
    queryString = queryString + ' from paises ps where  region_id = ? ';

   

    let paises = await sequelize.query(queryString,
     {  type: sequelize.QueryTypes.SELECT,
        replacements:[region_id]})
    return paises;
 }

 router.get('/:region_id', async(req, res) => {
    let{ region_id}=req.params;


    let paises = await obtenerTodosLosPaisesXRegion(region_id);
  
    return res.status(200).json({paises})
   
})



 
   





module.exports= router;  
