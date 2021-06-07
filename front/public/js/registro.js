

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
        'Authorization': `BEARER ${localStorage.getItem('token')}`

      } 
    }
 
    console.log(JSON.stringify(bodyEnviar));

    fetch('http://127.0.0.1:3000/api/usuarios/registro', fetchParams)
    .then(res=>res.json())
  
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
    
    
      if(campos.contrasena){
        formulario.reset();
    
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
          document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
    
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
          icono.classList.remove('formulario__grupo-correcto');
        });
      } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
          document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
      }
    })

    
    
     
       
})

//***************************************************validacion de contraseñas****************************************************************** */

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	contrasena: /^.{4,12}$/, // 4 a 12 digitos.
}

const campos = {
	contrasena: false,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
	
		case "contrasena":
      validarCampo(expresiones.contrasena, e.target, 'contrasena');
      validarrepetirContrasena();
      console.log('funciona')
		break;
		case "repetirContrasena":
      validarrepetirContrasena();
    break;
		
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


const validarrepetirContrasena = () => {
  let inputcontraseña = document.getElementById('contrasena');
  let inputrepetirContraseña= document.getElementById('repetirContrasena');

	if(inputcontraseña.value !== inputrepetirContraseña.value){
		document.getElementById(`grupo__repetirContrasena`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__repetirContrasena`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__repetirContrasena i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__repetirContrasena i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__repetirContrasena .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['contrasena'] = false;
	} else {
		document.getElementById(`grupo__repetirContrasena`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__repetirContrasena`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__repetirContrasena i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__repetirContrasena i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__repetirContrasena .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['contrasena'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});




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
        'Content-Type':'application/json',
        'Authorization': `BEARER ${localStorage.getItem('token')}`

      }
    }
 
    console.log(JSON.stringify(bodyEnviar));

    fetch('http://127.0.0.1:3000/api/usuarios', fetchParams)
    .then(res=> res.json())
    .then(json=> console.log(json));

   
       
})
  



