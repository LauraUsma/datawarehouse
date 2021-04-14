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




//ruta put para actualizar compañias

async function actualizarCompanias(data, id) {
    const {nombre, direccion, email, telefono, id_ciudades }=data
    let companias = await  sequelize.query('UPDATE Companias SET nombre = :nombre, direccion= :direccion,email= :email, telefono= :telefono, id_ciudades= :id_ciudades WHERE id= :id',
    { replacements: {nombre, direccion, telefono, id_ciudades, email, id}}
    ).then(function(cambios) {
       console.log(cambios)
   }) 
   return companias
 }
 

router.put('/:id', (req, res) => {
    actualizarCompanias(req.body, req.params.id).then(compania=>{
        res.status(200).json('compañia Actualizada')
    })
    .catch(error=>{
        console.log(error)
       
    })
   })




// rut get para mostrar compañias
/*

 router.get('/',  (req , res)=>{

    const paginacion={
        search:'',
        limit:10,
        offset:0
    
        }
        
        buscar_compañia(paginacion)
 
    .then(arrayCompanias=>{
        res.status(200).send(arrayCompanias)
    })

    
  });*/



  router.get('/', (req , res)=>{
      
    var queryString = '';

    console.log('ENTRE');
    queryString = queryString + ' SELECT cp.id, cp.nombre, cp.direccion, cp.email , cp.telefono, cd.nombre as ciudad ';
    queryString = queryString + ' from companias cp join ciudades cd on (cp.id_ciudades= cd.id) ';


   


  sequelize.query( queryString, 
    {type:sequelize.QueryTypes.SELECT}
      ). then(function (companias){
         //console.log(companias.ciudad);
          res.send(companias);
      }).catch(err =>console.error(err));

 });








   
   //Delete para borrar compañias
   
   router.delete('/', (req, res) => {
    let{ id}=req.body;
    
       sequelize.query(`DELETE FROM companias WHERE id = ?`, {
               replacements: [ id]
           })
           .then(proyects => res.status(200).send({
               status: 'OK',
               mensaje: 'Compañia Eliminada'
           }))
           .catch(err => console.log(err));
   })
   




module.exports= router;  
