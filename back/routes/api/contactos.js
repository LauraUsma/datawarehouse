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
    validarContacto
} = require('../functions');


//***************ruta post********* */

router.post('/',validarContacto, (req, res) => {

    nuevo_contacto(req.body)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' Contacto creado con exito'
        })).catch(err => console.log(err));
})

//*********ruta get************************* */

async function obtenerTodosLosContactos() {
    var queryString = '';
    queryString = queryString + 'SELECT ct.id, concat(ct.nombre, \' \', ct.apellido) as fullname, ct.email, concat(rg.nombre,\' \', ps.nombre ) as pais_region, cp.nombre as compania, ct.cargo, ct.interes ';
    queryString = queryString +' from contactos ct join companias cp on (ct.id_compania=cp.id) join regiones rg on (ct.id_region = rg.id) join paises ps on (ct.id_pais = ps.id) ';

    let contactos = await sequelize.query(queryString,
     { type: sequelize.QueryTypes.SELECT})
    return contactos;
 }

router.get('/', async (req,res)=>{

    let contactos = await obtenerTodosLosContactos();
  
    return res.status(200).json({contactos})
})



//*********************ruta put*************************** */

async function actualizarContactos(data, id) {

    const {nombre, apellido, cargo, email, id_compania, id_region, id_pais, id_ciudad,	direccion, interes,	 id_canal, cuenta, preferencia, id_canal2, cuenta2, preferencia2, id_canal3, cuenta3, preferencia3
    }=data
    let contactos = await  sequelize.query('UPDATE contactos SET nombre = :nombre, apellido= :apellido, cargo = :cargo,email= :email, id_compania= :id_compania, id_region = :id_region, id_pais= :id_pais, id_ciudad= :id_ciudad, direccion= :direccion, interes= :interes, id_canal= :id_canal, cuenta= :cuenta, preferencia=:preferencia, id_canal2= :id_canal2, cuenta2= :cuenta2, preferencia2=:preferencia2, id_canal3= :id_canal3, cuenta3= :cuenta3, preferencia3=:preferencia3 WHERE id= :id',
    { replacements: {  nombre , apellido, cargo,email, id_compania, id_region, id_pais, id_ciudad, direccion, interes, id_canal, cuenta, preferencia, id_canal2, cuenta2, preferencia2, id_canal3, cuenta3, preferencia3,id}}
    ).then(function(cambios) {
       console.log(cambios)
   }) 
   return contactos
 }

router.put('/:id', (req, res) => {
    let{ id}=req.params;
    actualizarContactos(req.body, id).then(contacto=>{
        res.status(200).json('contacto Actualizado')
    })
    .catch(error=>{
        console.log(error)
       
    })
   })


//*********ruta delete****************** */

router.delete('/:id', (req, res) => {
    let{ id}=req.params;
    
       sequelize.query(`DELETE FROM contactos WHERE id = ? `, {
               replacements: [ id]
           })
           .then(proyects => res.status(200).send({
               status: 'OK',
               mensaje: 'Contacto Eliminado'
           }))
           .catch(err => console.log(err));
   })



   



module.exports= router;  



