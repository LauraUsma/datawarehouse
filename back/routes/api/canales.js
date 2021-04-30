const router = require('express').Router();
const sequelize = require('../../database.js');
const jwt = require('jsonwebtoken');
const jwtClave= "p40y3c70cu47r0_Ac4m1c4";



async function obtenerTodasCIudades() {
    var queryString = '';


    queryString = queryString + ' SELECT cd.id,  cd.canal as canal FROM canales cd ';
    
    let canales_result = await sequelize.query(queryString,
     { type: sequelize.QueryTypes.SELECT})
    return canales_result;
 }

router.get('/', async(req , res)=>{

    let canales = await obtenerTodasCIudades();
  
    return res.status(200).json({canales})
  
 });









module.exports= router;  
