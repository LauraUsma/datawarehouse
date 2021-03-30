const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
const jwtClave= "p40y3c70cu47r0_Ac4m1c4";
const sequelize = require('../database.js');




//*********funciones **********/

 //funcion para agregar usuarios

 async function nuevo_usuario(usuarios) {
    let data = Object.values(usuarios)
    let resultado = await sequelize.query('INSERT INTO usuarios ( nombre, apellido, email, contraseña, repetir_contraseña, perfil_id) VALUES (?)', {
        replacements: [data]
    })
    return resultado;
}


//funcion buscar 1 usuario

async function consulta_usuario(usuarios){
    let resultadoUsuario = await sequelize.query('SELECT * FROM usuarios WHERE email = ?',{
        type: sequelize.QueryTypes.SELECT,
        replacements:[usuarios]
       
    })
    return resultadoUsuario
}


//funcion login

async function login(email, contraseña){
    let resultadoLogin = await sequelize.query('SELECT * FROM usuarios WHERE email = ? AND contraseña = ?',{
        replacements: [email, contraseña],
        type: sequelize.QueryTypes.SELECT

    })
if (resultadoLogin == '' ) {
    res.status(404).send({
        status: 404,
        mensaje: 'el usuario o la contraseña son incorrectos'})
}
    return resultadoLogin;
}


//funcion buscar todos los usuarios
/*
async function buscar_usuarios(){
    let resultado_buscar_usuario = await sequelize.query('SELECT * FROM usuarios',{
        type: sequelize.QueryTypes.SELECT
    })
    return resultado_buscar_usuario
}*/

async function buscar_usuarios(paginacion){
    const countUser = await sequelize.query(`select count(*) total from usuarios`, {
       type: sequelize.QueryTypes.SELECT
    });
    let resultado_buscar_usuario = await sequelize.query(`select * from usuarios limit ${paginacion.limit} offset ${paginacion.offset}`,{
        type: sequelize.QueryTypes.SELECT
    });
 
    const resultado = {
       total: countUser[0].total,
       totalNotFiltered: countUser[0].total,
       rows: resultado_buscar_usuario
 
    }
    //console.log(resultado);
 
    return resultado;
 }
 

/****************************************************************************************************** */


// middlware para validar el ingreso de usuarios repetidos

let validarUsuario = (req, res, next)=>{
  console.log('ingreso a validar usuario');
    let email = req.body.email;
   
    if(email){
        consulta_usuario(email)
        .then(proyects => {
            let usuarioNuevo = proyects.find(Usuario => Usuario.email == email)
            if (!usuarioNuevo) {
                return next();
            } else if (usuarioNuevo) {
                res.status(409).send({
                    status: 409,
                    mensaje: 'El usuario ya existe'
                })
            }
        }).catch(err => console.log(err));
    }
}

// middlware para validar el ingreso de usuarios no logueados

let usuarioExistente = (req, res, next) => {
    let email = req.body.email;
   
    if(email){
        consulta_usuario(email)
        .then(proyects => {
            let usuarioNuevo = proyects.find(U => U.email == email)
            if (usuarioNuevo) {
                return next();
            } else if (!usuarioNuevo) {
                res.status(409).send({
                    status: 409,
                    mensaje: 'El usuario no existe'
                })
            }
        }).catch(err => console.log(err));
    }
}


// middlware para validar roles


let roles_usuario = (req, res, next) => {
    let {perfil_id} = req.body;
    if(perfil_id === '1' || perfil_id === '2'){
        next();
    } else{
        res.status(409).send({
            status:'error',
            mensaje:'El campo roles solo acepta 1 para Administrador ó 2 para Usuarios'
        })
    }
}


// middlware para validar usuario y contraseña

let user_pass = (req, res, next) => {
    let {email, contraseña} = req.body;
    login(email, contraseña)
        .then(proyects => {
            let usuario = proyects.find(u => u.email == email && u.contraseña == contraseña)
            if (usuario) {
                return next();
            } else if (!usuario) {
                res.status(404).send({
                    status: 404,
                    mensaje: 'el usuario o la contraseña son incorrectos'
                });
            }
        })
}


// middlware para validar token

let verificar_role = (req, res, next) => {
    console.log('verificar role');

    let token = (req.headers.authorization).split(' ')[1];
    
    let decodificado = jwt.verify(token, jwtClave)

    const usuario = decodificado.email;

    consulta_usuario(usuario)
        .then(arrayUsuarios =>{
            let user = arrayUsuarios.find(Usuario => Usuario.email == usuario)
            if(user.perfil_id === 1){
                next();
            } else {
                res.status(403).send({
                    status:403,
                    mensaje:'solo el Administrador puede realizar esta acción'
                })
            }
        })
}

//*************************************COMPAÑIAS**************************************************** */


 //funcion para agregar compañias

 async function buscar_compañia(paginacion){
    const countUser = await sequelize.query(`select count(*) total from companias`, {
       type: sequelize.QueryTypes.SELECT
    });
    let resultado_buscar_compania = await sequelize.query(`select * from companias limit ${paginacion.limit} offset ${paginacion.offset}`,{
        type: sequelize.QueryTypes.SELECT
    });
 
    const resultado = {
       total: countUser[0].total,
       totalNotFiltered: countUser[0].total,
       rows: resultado_buscar_compania
 
    }
    //console.log(resultado);
 
    return resultado;
 }


 async function nuevo_compania(companias) {
    let data = Object.values(companias)
    let resultado = await sequelize.query('INSERT INTO companias ( nombre, dirección, email, telefono, id_ciudades ) VALUES (?)', {
        replacements: [data]
    })
    return resultado;
}



//**************************** */
async function consulta_compania(companias){
    let resultadoCompania = await sequelize.query('SELECT * FROM companias WHERE nombre = ?',{
        type: sequelize.QueryTypes.SELECT,
        replacements:[companias]
       
    })
    return resultadoCompania
}




// middlware para validar el ingreso de companias

let validarCompania= (req, res, next)=>{
  
    let nombre = req.body.nombre;
   
    if(nombre){
        consulta_compania(nombre)
        .then(proyects => {
            let  companiaNueva = proyects.find(Compania => Compania.nombre == nombre)
            if (! companiaNueva) {
                return next();
            } else if ( companiaNueva) {
                res.status(409).send({
                    status: 409,
                    mensaje: 'La compañia ya existe'
                })
            }
        }).catch(err => console.log(err));
    }
}

//*****************************REGIONES***************************** */

 //funcion para agregar REGIONES

 async function nueva_region(regiones) {
    let data = Object.values(regiones)
    let resultado = await sequelize.query('INSERT INTO regiones ( nombre ) VALUES (?)', {
        replacements: [data]
    })
    return resultado;
}


async function consulta_region(regiones){
    let resultadoRegion = await sequelize.query('SELECT * FROM regiones WHERE nombre = ?',{
        type: sequelize.QueryTypes.SELECT,
        replacements:[regiones]
       
    })
    return resultadoRegion
}

let validarRegion= (req, res, next)=>{
  
    let nombre = req.body.nombre;
   
    if(nombre){
        consulta_region(nombre)
        .then(proyects => {
            let  regionNueva = proyects.find(region => region.nombre == nombre)
            if (! regionNueva) {
                return next();
            } else if ( regionNueva) {
                res.status(409).send({
                    status: 409,
                    mensaje: 'La región ya existe'
                })
            }
        }).catch(err => console.log(err));
    }
}



//*****************************paises***************************** */

 //funcion para agregar paises

 async function nuevo_pais(paises) {
    let data = Object.values(paises)
    let resultado = await sequelize.query('INSERT INTO paises ( nombre, region_id ) VALUES (?)', {
        replacements: [data]
    })
    return resultado;
}


async function consulta_pais(paises){
    let resultadoPais = await sequelize.query('SELECT * FROM paises WHERE nombre = ?',{
        type: sequelize.QueryTypes.SELECT,
        replacements:[paises]
       
    })
    return resultadoPais
}

let validarPais= (req, res, next)=>{
  
    let nombre = req.body.nombre;
   
    if(nombre){
        consulta_pais(nombre)
        .then(proyects => {
            let  paisNuevo = proyects.find(pais => pais.nombre == nombre)
            if (! paisNuevo) {
                return next();
            } else if ( paisNuevo) {
                res.status(409).send({
                    status: 409,
                    mensaje: 'El país ya existe'
                })
            }
        }).catch(err => console.log(err));
    }
}


//*****************************ciudades***************************** */

 //funcion para agregar ciudades

 async function nueva_ciudad(ciudades) {
    let data = Object.values(ciudades)
    let resultado = await sequelize.query('INSERT INTO ciudades ( nombre, pais_id ) VALUES (?)', {
        replacements: [data]
    })
    return resultado;
}


async function consulta_ciudad(ciudades){
    let resultadoCiudad = await sequelize.query('SELECT * FROM ciudades WHERE nombre = ?',{
        type: sequelize.QueryTypes.SELECT,
        replacements:[ciudades]
       
    })
    return resultadoCiudad
}

let validarCiudad= (req, res, next)=>{
  
    let nombre = req.body.nombre;
   
    if(nombre){
        consulta_ciudad(nombre)
        .then(proyects => {
            let  ciudadNueva = proyects.find(ciudad => ciudad.nombre == nombre)
            if (! ciudadNueva) {
                return next();
            } else if ( ciudadNueva) {
                res.status(409).send({
                    status: 409,
                    mensaje: 'La ciudad ya existe'
                })
            }
        }).catch(err => console.log(err));
    }
}
















module.exports = {

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
    nueva_region,
    consulta_region,
    validarRegion,
    nuevo_pais,
    consulta_pais,
    validarPais,
    nueva_ciudad,
    consulta_ciudad,
    validarCiudad
    

}