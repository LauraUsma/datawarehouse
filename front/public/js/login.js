

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
      localStorage.setItem('perfil_id', json.perfil_id)
      let usuariosNav = document.getElementById('navItemUsuarios')

      console.log(json.perfil_id)
    
      if (json.token && json.perfil_id == "1" ) {
        location.href = "/front/views/contactos.html"
       usuariosNav.classList.toggle('displayblock')
     console.log(usuariosNav)
       }   
      else if(json.token && json.perfil_id == "2" ){
        location.href = "/front/views/contactos.html"
        usuariosNav.classList.toggle('displaynone')
        console.log(usuariosNav)
      }else{
        location.href = "/front/views/index.html"
        alert("el usuario o la contraseña son incorrectos")

      }
    });


    


})

       // let navUsuarios=document.getElementsByClassName('displaynone');
       //navUsuarios.classList.remove('displaynone');
       //navUsuarios.classList.add('displayblock');
       










