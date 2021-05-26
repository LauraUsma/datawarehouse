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



//**** delete para eliminar todos los contactos checked*******/

router.delete('/remove/:ids', (req, res) => {
    let {
        ids
    } = req.params;

    sequelize.query(`DELETE FROM contactos WHERE id in ( ? )`, {
            replacements: [ids]
        })
        .then(proyects => res.status(200).send({

            status: 'OK',
            mensaje: 'Contactos Eliminados'
        }))
        .catch(err => console.log(err));

})





module.exports = router;