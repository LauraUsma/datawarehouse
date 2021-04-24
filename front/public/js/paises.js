

const url2 = 'http://127.0.0.1:3000/api/paises'
const contenedor2 = document.getElementById('body2')
let resultados2 ='';
const form2 = document.getElementById('formulario2')
const regionPais = document.getElementById('regionPais')
let opcion2 =''
let region_id = document.getElementById('seleccionaRegion');


let btnCrearPais= document.getElementById('btnCrearPais');
btnCrearPais.addEventListener('click',()=>{
  
    opcion2='crear'
},false)

let btnCambiarPais= document.getElementById('btnCambiarPais');
btnCambiarPais.addEventListener('click',()=>{

    opcion2='editar'
},false)

let mostarPaises =document.getElementById('mostarPaises');
mostarPaises.addEventListener('click', ()=>{
    
    //document.getElementById('container_1').style.display='block';
 
},false)

//************mostrar regiones************ */
const tabla= (pais)=>{
   
    pais.pais.forEach(pais => {
       
    resultados2 += `
    <tr>
        <td>${pais.id}</td>
        <td>${pais.pais}</td>    
        <td class="text-center"> <a class="edit" href="javascript:void(0)" title="Edit">
        <i class="fa fa-edit"></i>
        <a class="remove" href="javascript:void(0)" title="Remove">
        <i class="fa fa-trash"></i>
        </a></td>
        
    </tr>
    
    `
   })

   contenedor2.innerHTML= resultados2;
}


fetch(url2)
.then(response =>response.json())
.then(data => tabla(data))
.catch(error => console.log(error))

//**********************************/
const on2 = (element, event, selector, handler)=>{
    element.addEventListener(event, e =>{
        if (e.target.closest(selector)){
            handler(e)
        }
    })
}

//**********************eliminar region***************** */
on2(document, 'click', '.remove', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)
   
    
    alertify.confirm("¿Desea Eliminar el registro?",
    function(){
        fetch("http://127.0.0.1:3000/api/paises/" +id, {
            
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

let idForm2 = 0
on(document, 'click', '.edit', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    idForm2= fila.children[0].innerHTML
    const paisForm1= fila.children[1].innerHTML
    console.log(paisForm1)

    regionPais.value=paisForm1
    opcion='editar'
    document.getElementById('btnCrearPais').style.display= 'none';
    document.getElementById('btnCambiarPais').style.display='block';
    

})

form2.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion2=='crear'){
        console.log('crear')

        let bodyEnviar ={
            nombre: regionPais.value,
            region_id: region_id.value
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
        fetch(url2, fetchParams)
        .then(res=> res.json())
        .then(data =>{
            const nuevoPais =[]
            nuevoPais.push(data)
            tabla(nuevoPais)
           
        })
       
       // console.log('opcion crear')
    }
    if(opcion2=='editar'){
        let bodyEnviar ={
            nombre: regionPais.value
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
        fetch("http://127.0.0.1:3000/api/paises/"+ idForm2, fetchParams)
        .then(res=> res.json())
        .then(data =>{  
            const nuevoPais =[]
            nuevoPais.push(data)
            tabla(nuevoPais)
           
        })

        //console.log('opcion editar')


    }
})



async function loadRegions() {
    const selected = document.getElementById('seleccionaRegion');
    const resultado = await apiWarehouse('api/region', 'GET','','');
    console.log(resultado);

    resultado.rows.forEach(row=>{
    const elemento=document.createElement('option');
    const textNode = document.createTextNode(row.nombre);
    elemento.appendChild(textNode);
    elemento.setAttribute('value', row.id);
    selected.add(elemento);
});

}
loadRegions();




