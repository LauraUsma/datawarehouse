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
    console.log(resultado);
 
    return resultado;
 }
 

/****************************************************************************************************** */


// middlware para validar el ingreso de usuarios repetidos

let validarUsuario = (req, res, next)=>{
  
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

    let token = (req.headers.authorization).split(' ')[1];
    
    let decodificado = jwt.verify(token, jwtClave)

    const usuario = decodificado.user;

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

}