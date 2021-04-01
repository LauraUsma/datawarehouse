let perfilaEnviar=
$('#perfil').on('change', function(){
  let valor = this.value;
  let texto =$(this).find('option:selected').text();


});

let btnCrear = document.getElementById('btnCrear');

btnCrear.addEventListener('click', ()=>{
    let inputnombre = document.getElementById('nombre');
    console.log(inputnombre.value);

    let inputapellido = document.getElementById('apellido');
    console.log(inputapellido.value);

    let inputemail = document.getElementById('email');
    console.log(inputemail.value);

    let inputperfil =document.getElementById('perfil');
    console.log(inputperfil.value);

    let inputcontraseña = document.getElementById('contrasena');
    console.log(inputcontraseña.value);

    let inputrepetirContraseña= document.getElementById('repetirContrasena');
    console.log(inputrepetirContraseña.value);

    let bodyEnviar={
        nombre:inputnombre.value, 
        apellido:inputapellido.value,
        email: inputemail.value,
        contraseña:inputcontraseña.value,
        repetir_contraseña:inputrepetirContraseña.value,
        perfil_id:inputperfil.value
    };
    let fetchParams = {
      method:'POST',
      body: JSON.stringify(bodyEnviar),
      headers:{
        'Content-Type':'application/json',
        //'Authorization': 'token' + json.token
        //'Authorization':localStorage.setItem(token) 
   
        'Authorization': `BEARER ${localStorage.getItem('token')}`


      } 
    }
 
    console.log(JSON.stringify(bodyEnviar));

    fetch('http://127.0.0.1:3000/api/usuarios/registro', fetchParams)
    .then(res=>res.json())
    
   
  

   
       
})




//************************** */




  

//*****************funcion para eliminar los registros de usuarios****************** */
function deleteRegistroUsuario (id) {
  let bodyDelete={
        id:id
};
let fetchParams = {
  method:'DELETE',
  body: JSON.stringify(bodyDelete),
  headers:{
    'Content-Type':'application/json',
    'Authorization': `BEARER ${localStorage.getItem('token')}`

  }
}
console.log('id del registro a borrar'+id);
  fetch('http://127.0.0.1:3000/api/usuarios', fetchParams)
  .then(res=> res.json())
  .then(json=> console.log(json));
}

//**************función para actualizar los registros del usuario*****************/

let btnCambiar = document.getElementById('btnCambiar');
btnCambiar.addEventListener('click', ()=>{
    let inputnombre = document.getElementById('nombre');
    console.log(inputnombre.value);

    let inputapellido = document.getElementById('apellido');
    console.log(inputapellido.value);

    let inputperfil = document.getElementById('perfil');
    console.log(inputperfil.value);

    let inputemail = document.getElementById('email');
    console.log(inputemail.value);

 

    let inputcontraseña = document.getElementById('contrasena');
    console.log(inputcontraseña.value);

    let inputrepetirContraseña= document.getElementById('repetirContrasena');
    console.log(inputrepetirContraseña.value);

    let inputIdUsuario= document.getElementById('usuarioId');
    console.log(inputIdUsuario.value);


    let bodyEnviar={
        nombre:inputnombre.value, 
        apellido:inputapellido.value,
        perfil_id:inputperfil.value,
        email: inputemail.value,
        id: inputIdUsuario.value,
     
        
    };
    let fetchParams = {
      method:'PUT',
      body: JSON.stringify(bodyEnviar),
      headers:{
        'Content-Type':'application/json'
      }
    }
 
    console.log(JSON.stringify(bodyEnviar));

    fetch('http://127.0.0.1:3000/api/usuarios', fetchParams)
    .then(res=> res.json())
    .then(json=> console.log(json));

   
       
})
  






 console.log('hola mundo')