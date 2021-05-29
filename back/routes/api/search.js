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





async function buscartodaslasconincidencias(para1) {
  
    var sqlQuery = ' '
sqlQuery = sqlQuery + 'SELECT ct.id, concat(ct.nombre, \' \', ct.apellido) as fullname, ct.email, concat(rg.nombre,\' \', ps.nombre ) as pais_region, cp.nombre as compania, ct.cargo, ct.interes ';
sqlQuery = sqlQuery + ' from contactos ct join companias cp on (ct.id_compania=cp.id) join regiones rg on (ct.id_region = rg.id) join paises ps on (ct.id_pais = ps.id) WHERE ';
sqlQuery = sqlQuery + ' ct.nombre like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or ct.apellido like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or ct.email like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or ps.nombre like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or rg.nombre like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or ct.cargo like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or cp.nombre like \''+ '%'+ para1 + '%\' ' ;
    
    let contactos = await sequelize.query(sqlQuery,
     { type: sequelize.QueryTypes.SELECT})
    return contactos;
 }

router.get('/:para1', async (req,res)=>{
    let {
        para1
    } = req.params;
    let search = await buscartodaslasconincidencias(para1);
  
    return res.status(200).json({search})
})


/*
router.get('/:para1', (req, res) => {
    let {
        para1
    } = req.params;
    console.log(para1);

let sqlQuery = ' '
sqlQuery = sqlQuery + 'SELECT ct.id, concat(ct.nombre, \' \', ct.apellido) as fullname, ct.email, concat(rg.nombre,\' \', ps.nombre ) as pais_region, cp.nombre as compania, ct.cargo, ct.interes ';
sqlQuery = sqlQuery + ' from contactos ct join companias cp on (ct.id_compania=cp.id) join regiones rg on (ct.id_region = rg.id) join paises ps on (ct.id_pais = ps.id) WHERE ';
sqlQuery = sqlQuery + ' ct.nombre like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or ct.apellido like \''+ '%'+ para1 + '%\' ' ;
sqlQuery = sqlQuery + ' or ct.email like \''+ '%'+ para1 + '%\' ' ;

sqlQuery = sqlQuery + ' or ps.nombre like \''+ '%'+ para1 + '%\' ' ;

sqlQuery = sqlQuery + ' or ct.cargo like \''+ '%'+ para1 + '%\' ' ;

sqlQuery = sqlQuery + ' or cp.nombre like \''+ '%'+ para1 + '%\' ' ;


    let contactosSearchResponse = sequelize.query( sqlQuery, {
            replacements: [para1]
        })
        .then(proyects => res.status(200)
        .json({contactosSearchResponse}))
        
        
       // send({
//            status: 'OK',
  //      }))
        .catch(err => console.log(err));

})
*/

module.exports = router;

