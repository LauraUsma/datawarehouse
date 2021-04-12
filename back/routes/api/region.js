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
    validarCompania,
    consulta_compania,
    nuevo_compania,
    nueva_region,
    consulta_region,
    validarRegion

} = require('../functions');

//ruta post para ingresar regiones

router.post('/', validarRegion, (req, res) => {

    nueva_region(req.body)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' Región agregada exitosamente'
        })).catch(err => console.log(err));
})

//ruta put para actualizar regiones

router.put('/', (req, res) => {
    let{ id, nombre}=req.body;
    
       sequelize.query(`UPDATE regiones SET nombre= ? WHERE id = ?`, {
               replacements: [nombre, id]
           })
           .then(proyects => res.status(200).send({
               status: 'OK',
               mensaje: 'Región Actualizada'
           }))
           .catch(err => console.log(err));
   })



// rut get para mostrar regiones 

async function obtenerTodasLasRegiones() {

    let region = await sequelize.query('SELECT * FROM regiones', { type: sequelize.QueryTypes.SELECT})
    return region;
 }

 router.get('/', async (req, res) => {

    let regions = await obtenerTodasLasRegiones();
    return res.status(200).json({regions})
})




/*
router.get('/', (req , res)=>{

    sequelize.query('SELECT * FROM regiones', {type:sequelize.QueryTypes.SELECT})
     .then(function (regiones){
         console.log(regiones);
         //res.send(regiones);
       return res.status(200).json({regiones})
     }).catch(err =>console.error(err));
 });
 */
 
// ruta delete para eliminar regiones

router.delete('/',(req,res)=>{
    let{ id}=req.body;

    sequelize.query(`DELETE FROM regiones WHERE id=?`,{
        replacements:[id]
    })
    .then(proyects => res.status(200).send({
        status:'OK',
        mensaje:'Región Eliminada'
    }))
    .catch(err=> console.log(err));
})
   

//****************************** */
/*
router.get('/regiones', (req , res)=>{
    var queryString = '';
    queryString = queryString + ' SELECT regiones.id id, regiones.nombre Nombre Región, paises.nombre Nombre Pais, ciudades.nombre Nombre Ciudad';
    queryString = queryString + ' from regiones rg join paises ps on (rg.id= ps.region_id) ';
    queryString = queryString + ' join ciudades cd on (ps.id = cd.pais_id) ';


    
    let user= req.body.id;


  sequelize.query( queryString, 
    {replacements: [user],type:sequelize.QueryTypes.SELECT}
      ). then(function (regiones){
         console.log(regiones);
          res.send(regiones);
      }).catch(err =>console.error(err));

 });*/




 
   





module.exports= router;  
