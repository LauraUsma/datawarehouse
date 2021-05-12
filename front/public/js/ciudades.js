/*let btnCrearCiudad = document.getElementById('btnCrearCiudad');

btnCrearCiudad.addEventListener('click', (e)=>{
    let inputPais = document.getElementById('seleccionaPais');
    console.log(inputPais.value)
    
    let inputCiudad=document.getElementById('regionCiudad');
    console.log(inputCiudad.value)

    let bodyEnviar = {
       
        nombre: inputCiudad.value,
        pais_id: inputPais.value
     }

     let id, method = '';
     if(document.getElementById('regionCiudad').dataset.id){
         id= document.getElementById('regionCiudad').dataset.id;
         method = 'PUT';
     }else{
         id='';
         method= 'POST';
     }
 
     apiWarehouse('api/ciudades', 'POST', JSON.stringify(bodyEnviar), id)
     .then(resultado => {
         console.log(resultado);
     }).catch (error => console.log(eror));

},false)*/
const url3 = 'http://127.0.0.1:3000/api/ciudades'
const contenedor3 = document.getElementById('body3')
let resultados3 ='';
const form3 = document.getElementById('formulario3')
const regionCiudad = document.getElementById('regionCiudad')
let opcion3 =''
let inputPais = document.getElementById('seleccionaPais');


let btnCrearCiudad= document.getElementById('btnCrearCiudad');
btnCrearCiudad.addEventListener('click',()=>{
  
    opcion3='crear'
},false)

let btnCambiarCiudad= document.getElementById('btnCambiarCiudad');
btnCambiarCiudad.addEventListener('click',()=>{

    opcion3='editar'
},false)

let mostarCiudad =document.getElementById('mostarCiudad');
mostarCiudad.addEventListener('click', ()=>{
    
    document.getElementById('container_3').style.display='block';
    document.getElementById('container_1').style.display='none';
    document.getElementById('container_2').style.display='none';
  
 
 
},false)

//************mostrar regiones************ */
const tablaCiudad= (ciudades)=>{
   console.log(ciudades)
    ciudades.ciudades.forEach(ciudad => {
       
    resultados3 += `
    <tr>
      
        <td>${ciudad.id}</td>
        <td>${ciudad.ciudad}</td>    
        <td class="text-center"> <a class="edit" href="javascript:void(0)" title="Edit">
        <i class="fa fa-edit"></i>
        <a class="remove" href="javascript:void(0)" title="Remove">
        <i class="fa fa-trash"></i>
        </a></td>
        
    </tr>
    
    `
   })

   contenedor3.innerHTML= resultados3;
}


fetch(url3)
.then(response =>response.json())
.then(data => tablaCiudad(data))
.catch(error => console.log(error))

//**********************************/
const on3 = (element, event, selector, handler)=>{
    element.addEventListener(event, e =>{
        if (e.target.closest(selector)){
            handler(e)
        }
    })
}

//**********************eliminar region***************** */
on3(document, 'click', '.remove', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)
   
    
    alertify.confirm("¿Desea Eliminar el registro?",
    function(){
        fetch("http://127.0.0.1:3000/api/ciudades/" +id, {
            
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



//*************editar y crear region*************** */

let idForm3 = 0
on(document, 'click', '.edit', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    idForm3= fila.children[0].innerHTML
    const ciudadForm1= fila.children[1].innerHTML
    console.log(ciudadForm1)

    regionCiudad.value=ciudadForm1
    opcion='editar'
    document.getElementById('btnCrearCiudad').style.display= 'none';
    document.getElementById('btnCambiarCiudad').style.display='block';
    

})

form3.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion3=='crear'){
        console.log('crear')

        let bodyEnviar ={
            nombre: regionCiudad.value,
            pais_id: inputPais.value
        }

        let fetchParams={
            method:'POST',
            body: JSON.stringify(bodyEnviar),
            headers:{
                'Content-Type':'application/json',  
                'Authorization': `BEARER ${localStorage.getItem('token')}`
              } 

        }
        //console.log(JSON.stringify(bodyEnviar))
        fetch(url3, fetchParams)
        .then(res=> res.json())
        .then(data =>{
            const nuevaCiudad =[]
            nuevaCiudad.push(data)
            tablaCiudad(nuevaCiudad)
           
        })
       
       // console.log('opcion crear')
    }
    if(opcion3=='editar'){
        let bodyEnviar ={
            nombre: regionCiudad.value
        }

        let fetchParams={
            method:'PUT',
            body: JSON.stringify(bodyEnviar),
            headers:{
                'Content-Type':'application/json',  
                'Authorization': `BEARER ${localStorage.getItem('token')}`
              } 

        }
        //console.log(JSON.stringify(bodyEnviar))
        fetch("http://127.0.0.1:3000/api/ciudades/"+ idForm3, fetchParams)
        .then(res=> res.json())
        .then(data =>{  
            const nuevaCiudad =[]
            nuevaCiudad.push(data)
            tablaCiudad(nuevaCiudad)
           
        })

        //console.log('opcion editar')


    }
})





async function loadPaises() {
    const selected = document.getElementById('seleccionaPais');
    const resultado = await apiWarehouse('api/paises', 'GET','','');
    console.log(resultado);

    resultado.rows.pais.forEach(row=>{
    const elemento=document.createElement('option');
    const textNode = document.createTextNode(row.pais);
    elemento.appendChild(textNode);
    elemento.setAttribute('value', row.id);
    selected.add(elemento);
});

}
loadPaises();




