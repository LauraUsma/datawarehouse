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


/*************************************fredy****************** */

/*
router.post('/', (req, res) => {
    let{ bodyaEnviar}=req.params;
    //let {canales_asociados}=req.params

    let id_contacto = nuevo_contacto(bodyaEnviar);
        guardar_canales(bodyaEnviar,id_contacto)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' Contacto creado con exito'
        })).catch(err => console.log(err));
})
;

async function guardar_canales(listado_canales, contactoId){
    let data = Object.values(listado_canales)

for (var i=0; i<data.length; i++) {
    let elemento_n = data[i];
    let resultado = await sequelize.query('INSERT INTO contactosxcanales ( id_contacto, id_canal,  cuenta_usuario, preferencia) VALUES (?,?,?,?) ', {
        replacements: [ contactoId, elemento_n, elemento_n, elemento_n] //falta recuperar los valores que se enviaron por el nombre
    })
    return resultado;
}
    


}
*/

//*********************ruta put*************************** */
/*
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

*/
//*********ruta delete****************** */
/*
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
   
*/




module.exports= router;  



