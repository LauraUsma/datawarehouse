const router = require('express').Router();
const sequelize = require('../../database.js');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
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
    verificar_role
} = require('../functions');


//********************************rutas************************** */


//ruta post para registrar usuarios

router.post('/registro', validarUsuario, roles_usuario,verificar_role, (req, res) => {

    nuevo_usuario(req.body)
        .then(proyects => res.status(200).send({
            status: 200,
            mensaje: ' Usuario agregado exitosamente'
        })).catch(err => console.log(err));
})




//ruta GET que devuelve la información del usuario

/*
router.get('/', (req , res)=>{

   let token = (req.headers.authorization).split(' ')[1];
   let decodificado = jwt.verify(token, jwtClave);
   const usuario= decodificado.email;

   consulta_usuario(usuario)

   .then(arrayUsuarios=>{
       let users= arrayUsuarios.find(u => u.email == usuario)
       res.status(200).send(users)
   })
 });

*/

 //**************** */

 

router.get('/all',  (req , res)=>{


    const paginacion={
        search:'',
        limit:10,
        offset:0
    
        }
        
    buscar_usuarios(paginacion)
 
    .then(arrayUsuarios=>{
        res.status(200).send(arrayUsuarios)
    })
  });
 

//****************ruta PUT para cambiar un dato del usuario************ */


router.put('/',verificar_role, (req, res) => {
    let{ nombre, apellido, email, perfil_id, id}=req.body;
    
       sequelize.query(`UPDATE usuarios SET nombre= ?, apellido = ?, email=?, perfil_id = ? WHERE id = ?`, {
               replacements: [nombre, apellido, email, perfil_id,id]
           })
           .then(proyects => res.status(200).send({
               status: 'OK',
               mensaje: 'Usuario Actualizado'
           }))
           .catch(err => console.log(err));
   })
   
   

   //Delete para borrar usuarios
   
   router.delete('/',verificar_role, (req, res) => {
       let{ id}=req.body;
       
          sequelize.query(`DELETE FROM usuarios WHERE id = ?`, {
                  replacements: [ id]
              })
              .then(proyects => res.status(200).send({
                  status: 'OK',
                  mensaje: 'Usuario Eliminado'
              }))
              .catch(err => console.log(err));
      })
      
   
   
   
   


module.exports=  router;  