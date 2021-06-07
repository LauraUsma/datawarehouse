let usuariosNav = document.getElementById('navItemUsuarios')
let perfil = localStorage.getItem('perfil_id')

console.log(perfil)
if (perfil == "1" ) {
   usuariosNav.classList.toggle('displayblock')
   usuariosNav.classList.toggle('navItemUsuarios')

 console.log(usuariosNav)
   }   
  else if(perfil == "2" ){
    usuariosNav.classList.toggle('navItemUsuarios')
    usuariosNav.classList.toggle('displaynone')
    console.log(usuariosNav)
  }
