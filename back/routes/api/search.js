const router = require('express').Router();
const sequelize = require('../../database.js');
const jwt = require('jsonwebtoken');
const jwtClave = "p40y3c70cu47r0_Ac4m1c4";

const {
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





router.get('/para1', (req, res) => {
    let {
        para1
    } = req.params;
    sequelize.query(`  
    SELECT ct.id, concat(ct.nombre, \' \', ct.apellido) as fullname, ct.email, concat(rg.nombre,\' \', ps.nombre ) as pais_region, cp.nombre as compania, ct.cargo, ct.interes 
        from contactos ct join companias cp on (ct.id_compania=cp.id) join regiones rg on (ct.id_region = rg.id) join paises ps on (ct.id_pais = ps.id
        where 
        ct.nombre like '%:par1%' 
        or ct.apellido like '%:par1%'
        or ct.email like '%:par1'
        or ps.nombre like '%:par1'
        or ct.cargolike '%:par1'
        or cp.nombre like '%:par1%'
         
         `, {
            replacements: [para1]
        })
        .then(proyects => res.status(200).send({

            status: 'OK',
        }))
        .catch(err => console.log(err));

})


module.exports = router;

