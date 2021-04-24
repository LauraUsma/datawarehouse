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



//*********************ruta put*************************** */

async function actualizarContactos(data, id) {
    const {nombre, apellido, cargo, email, id_companias, id_region, id_pais, id_ciudad,	direccion, interes,	canal, cuenta, preferencias}=data
    let contactos = await  sequelize.query('UPDATE contactos SET nombre = :nombre, apellido= :apellido, cargo = :cargo,email= :email, id_companias= :id_companias, id_region = :id_region, id_pais= :id_pais, id_ciudad= :id_ciudad, direccion= :direccion, interes= :interes,	canal= :canal, cuenta= :cuenta, preferencias=:preferencias WHERE id= :id',
    { replacements: { nombre, apellido, cargo, email, id_companias, id_region, id_pais, id_ciudad,	direccion, interes,	canal, cuenta, preferencias,
        id}}
    ).then(function(cambios) {
       console.log(cambios)
   }) 
   return contactos
 }

router.put('/:id', (req, res) => {
    actualizarContactos(req.body, req.params.id).then(contacto=>{
        res.status(200).json('contacto Actualizado')
    })
    .catch(error=>{
        console.log(error)
       
    })
   })


//*********ruta delete****************** */

router.delete('/', (req, res) => {
    let{ id}=req.body;
    
       sequelize.query(`DELETE FROM contactos WHERE id = ?`, {
               replacements: [ id]
           })
           .then(proyects => res.status(200).send({
               status: 'OK',
               mensaje: 'Contacto Eliminado'
           }))
           .catch(err => console.log(err));
   })
   





module.exports= router;  



