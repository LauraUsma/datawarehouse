const urlContactos = 'http://127.0.0.1:3000/api/contactos'
const contenedor = document.querySelector('tbody')
const formularioContacto = document.getElementById('formularioContacto')
const tableContact = document.getElementById('tableContact');
const abrirModal= document.getElementById('modal1')
let btnguardarContacto = document.getElementById('guardarContacto');
let btnEditarContacto = document.getElementById('editar_Contacto')
let opcion = '';
let resultados = '';


let nombreContacto= document.getElementById('nombre');
let apellidoContacto = document.getElementById('apellido');
let cargoContacto = document.getElementById('cargo');
let emailContacto = document.getElementById('email');
let companiaContacto =document.getElementById('compania');
let regionContacto =document.getElementById('region');
let paisContacto =document.getElementById('pais');
let ciudadContacto =document.getElementById('ciudad');
let direccionContacto = document.getElementById('direccion');
let interesContacto = document.getElementById('interes');
let canalContacto = document.getElementById('canal');
let cuentaContacto = document.getElementById('cuentaUsuario');
let preferenciasContacto = document.getElementById('preferencias');
let canal2Contacto = document.getElementById('canal2');
let cuenta2Contacto = document.getElementById('cuentaUsuario2');
let preferencias2Contacto = document.getElementById('preferencias2');
let canal3Contacto = document.getElementById('canal3');
let cuenta3Contacto = document.getElementById('cuentaUsuario3');
let preferencias3Contacto = document.getElementById('preferencias3');

btnguardarContacto.addEventListener('click', (e)=>{
    opcion='crear' 
}, false);

btnEditarContacto.addEventListener('click', (e)=>{
    opcion='editar'
})

const mostrar= (contactos)=>{
    console.log(contactos)
    contactos.contactos.forEach(contacto => {
        resultados += `
        <tr class="">
            <td class ="text-center "><input type="checkbox" id ="check_${contacto.id}" class="checkitem " value=""/> </td>
            <td>${contacto.id}</td>
            <td>${contacto.fullname}</td>
            <td>${contacto.email}</td>
            <td>${contacto.pais_region}</td>
            <td>${contacto.compania}</td>
            <td>${contacto.cargo}</td>
            <td>${contacto.interes}</td>
            <td class="text-center"> <a class="edit" href="javascript:void(0)" title="Edit">
            <i class="fa fa-edit"></i>
            <a class="remove" href="javascript:void(0)" title="Remove">
            <i class="fas fa-trash"></i>
            </a></td>
                
        </tr>
        
        `
    
    })
    contenedor.innerHTML=resultados;
}

fetch(urlContactos)
.then(response =>response.json())
.then (data => mostrar(data))
.catch(error => console.log(error))



const on = (element, event, selector, handler)=>{
    element.addEventListener(event, e =>{
        if (e.target.closest(selector)){
            handler(e)
        }
    })
}

//**********************eliminar contacto***************** */
on(document, 'click', '.remove', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    console.log(fila)
    const id = fila.children[1].innerHTML
    console.log(id)
   
    alertify.confirm("¿Desea Eliminar el registro?",
    function(){
        fetch("http://127.0.0.1:3000/api/contactos/" + id, {
            
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',  
                'Authorization': `BEARER ${localStorage.getItem('token')}`
              } 
        
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    },
    function(){
        alertify.error('cancel')
    })

   
 
})


//*************editar y crear contacto*************** */

let idcontacto = 0
on(document, 'click', '.edit', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    idcontacto= fila.children[1].innerHTML
    //console.log(idcontacto)

    const nombreForm = fila.children[2].innerHTML
    const emailForm = fila.children[3].innerHTML
    const regionForm = fila.children[4].innerHTML
    const companiaForm = fila.children[5].innerHTML
    const cargoForm = fila.children[6].innerHTML
    const interesForm= fila.children[7].innerHTML

    //console.log(`id:${idcontacto}-nombre:${nombreContacto}-email:${emailContacto}-pais:${pais}-compania:${companiaContacto}-cargo:${cargoContacto}-interes:${interesContacto} `)
    nombreContacto.value = nombreForm
    apellidoContacto.value = nombreForm
    cargoContacto.value = cargoForm
    emailContacto.value = emailForm
    companiaContacto.value = companiaForm
    regionContacto.value = regionForm
    paisContacto.value = regionForm
    ciudadContacto.value =regionForm
    interesContacto.value = interesForm

    opcion='editar'
    document.getElementById('guardarContacto').style.display= 'none';
    document.getElementById('editar_Contacto').style.display='block';
    

   
    $("#modal1").show();


})


/***Crear y editar Contacto******* */

formularioContacto.addEventListener('submit', (e)=>{

    if(opcion=='crear'){
 
        let bodyEnviar ={
        nombre: nombreContacto.value, 
        apellido:apellidoContacto.value, 
        cargo:cargoContacto.value, 
        email:emailContacto.value, 
        id_compania:companiaContacto.value, 
        id_region: regionContacto.value, 
        id_pais: paisContacto.value, 
        id_ciudad:ciudadContacto.value,	
        direccion:direccionContacto.value, 
        interes:interesContacto.value, 
        id_canal:canalContacto.value, 
        cuenta:cuentaContacto.value, 
        preferencia:preferenciasContacto.value, 
        id_canal2:canal2Contacto.value, 
        cuenta2:cuenta2Contacto.value, 
        preferencia2:preferencias2Contacto.value, 
        id_canal3:canal3Contacto.value,	
        cuenta3:cuenta3Contacto.value, 
        preferencia3:preferencias3Contacto.value

        }

        let fetchParams={
            method:'POST',
            body: JSON.stringify(bodyEnviar),
            headers:{
                'Content-Type':'application/json',  
                'Authorization': `BEARER ${localStorage.getItem('token')}`
              } 

        }
        fetch(urlContactos, fetchParams)
        .then(res=> res.json())
        .then(data =>{
            const nuevos_Contactos =[]
            nuevos_Contactos.push(data)
            mostrar(nuevos_Contactos)
           
        })
        

    }
    if(opcion=='editar'){
        console.log('opcion editar')

        let bodyEnviar ={
            nombre: nombreContacto.value, 
            apellido:apellidoContacto.value, 
            cargo:cargoContacto.value, 
            email:emailContacto.value, 
            id_compania:companiaContacto.value, 
            id_region: regionContacto.value, 
            id_pais: paisContacto.value, 
            id_ciudad:ciudadContacto.value,	
            direccion:direccionContacto.value, 
            interes:interesContacto.value, 
            id_canal:canalContacto.value, 
            cuenta:cuentaContacto.value, 
            preferencia:preferenciasContacto.value, 
            id_canal2:canal2Contacto.value, 
            cuenta2:cuenta2Contacto.value, 
            preferencia2:preferencias2Contacto.value, 
            id_canal3:canal3Contacto.value,	
            cuenta3:cuenta3Contacto.value, 
            preferencia3:preferencias3Contacto.value
    
            }
    
        let fetchParams={
            method:'PUT',
            body: JSON.stringify(bodyEnviar),
            headers:{
                'Content-Type':'application/json',  
                'Authorization': `BEARER ${localStorage.getItem('token')}`
              } 

        }
        fetch("http://127.0.0.1:3000/api/contactos/"+ idcontacto, fetchParams)
        .then(res=> res.json())
        .then(data =>{
        
    
            const nuevos_Contactos =[]
            nuevos_Contactos.push(data)
            mostrar(nuevos_Contactos)
        })

    }
    $("#modal1").hide();
})