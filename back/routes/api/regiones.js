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

//****************************** */
router.get('/', (req , res)=>{
      
  var queryString = '';

  console.log('ENTRE');
  queryString = queryString + ' SELECT rg.id, rg.nombre as region, ps.nombre as pais, cd.nombre as ciudad';
  queryString = queryString + ' from regiones rg join paises ps on (rg.id= ps.region_id) ';
  queryString = queryString + ' join ciudades cd on (ps.id= cd.pais_id) ';



sequelize.query( queryString, 
  {type:sequelize.QueryTypes.SELECT}
    ). then(function (regiones){
       //console.log(companias.ciudad);
        res.send(regiones);
    }).catch(err =>console.error(err));

});











module.exports= router;  