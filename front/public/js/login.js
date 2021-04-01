

let btnIngresar = document.getElementById('btnIngresar');
btnIngresar.addEventListener('click', () => {
  let inputUsuario = document.getElementById('usuario');
  //console.log(inputUsuario.value);

  let inputPass = document.getElementById('pass');
  //console.log(inputPass.value);

  let bodyEnviar = {
    email: inputUsuario.value,
    contraseña: inputPass.value
  };
  let fetchParams = {
    method: 'POST',
    body: JSON.stringify(bodyEnviar),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log(JSON.stringify(bodyEnviar));

  fetch('http://127.0.0.1:3000/api/sign', fetchParams)
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token)
      if (json.token) {
        location.href = "/front/views/contactos.html"
      } else {
        location.href = "/front/views/index.html"
        alert("el usuario o la contraseña son incorrectos")

      }
    });




})



//**************** */
/*

.then(json => {
  localStorage.setItem('token', json.token)

  if ( !inputemail.value) {
    alert("El usuario fue creado con Exito")
  }else if(inputemail.value ){
    alert("El usuario ya existe")

  }
  else if(!json.token){
    alert("solo el Administrador puede realizar esta acción")

  }
});
*/