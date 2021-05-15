const urlContactos = 'http://127.0.0.1:3000/api/contactos'
const contenedor = document.querySelector('tbody')
const formularioContacto = document.getElementById('formularioContacto')
let btnguardarContacto = document.getElementById('guardarContacto');
let opcion = '';
let resultados = '';


let nombreContacto= document.getElementById('nombre');
console.log(nombreContacto.value);

let apellidoContacto = document.getElementById('apellido');
console.log(apellidoContacto.value);

let cargoContacto = document.getElementById('cargo');
console.log(cargoContacto.value);


let emailContacto = document.getElementById('email');
console.log(emailContacto.value);

let companiaContacto =document.getElementById('compania');
console.log(companiaContacto.value);

let regionContacto =document.getElementById('region');
console.log(regionContacto.value);

let paisContacto =document.getElementById('pais');
console.log(paisContacto.value);

let ciudadContacto =document.getElementById('ciudad');
console.log(ciudadContacto.value);

let direccionContacto = document.getElementById('direccion');
console.log(direccionContacto.value);

let interesContacto = document.getElementById('interes');
console.log(interesContacto.value);

let canalContacto = document.getElementById('canal');
console.log(canalContacto.value);

let cuentaContacto = document.getElementById('cuentaUsuario');
console.log(cuentaContacto.value);

let preferenciasContacto = document.getElementById('preferencias');
console.log(preferenciasContacto.value);

let canal2Contacto = document.getElementById('canal2');
console.log(canal2Contacto.value);

let cuenta2Contacto = document.getElementById('cuentaUsuario2');
console.log(cuenta2Contacto.value);

let preferencias2Contacto = document.getElementById('preferencias2');
console.log(preferencias2Contacto.value);

let canal3Contacto = document.getElementById('canal3');
console.log(canal3Contacto.value);

let cuenta3Contacto = document.getElementById('cuentaUsuario3');
console.log(cuenta3Contacto.value);

let preferencias3Contacto = document.getElementById('preferencias3');
console.log(preferencias3Contacto.value);

btnguardarContacto.addEventListener('click', (e)=>{
    opcion='crear'

}, false);

const mostrar= (contactos)=>{
    console.log(contactos)
    contactos.contactos.forEach(contacto => {
        resultados += `
        <tr class="">
            <td class ="text-center"><input type="checkbox" id ="check_${contacto.id}" class="checkitem" value=""/> </td>
            <td>${contacto.id}</td>
            <td>${contacto.fullname}</td>
            <td>${contacto.email}</td>
            <td>${contacto.pais_region}</td>
            <td>${contacto.compania}</td>
            <td>${contacto.cargo}</td>
            <td>${contacto.interes}</td>
            <td class="text-center"> <a class="edit" href="javascript:void(0)" title="Edit">
            <i class="fa fa-edit"></i>
           </td>
            
        </tr>
        
        `
    
    })
    contenedor.innerHTML=resultados;
}

fetch(urlContactos)
.then(response =>response.json())
.then (data => mostrar(data))
.catch(error => console.log(error))


/*


*/