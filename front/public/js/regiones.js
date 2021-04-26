
const url = 'http://127.0.0.1:3000/api/region'
const contenedor = document.querySelector('tbody')
let resultados ='';
const form1 = document.getElementById('formulario1')
const regionNueva = document.getElementById('regionNueva')
let opcion =''

let btnAgregarRegion= document.getElementById('btnAgregarRegion');
btnAgregarRegion.addEventListener('click',()=>{
  
    opcion='crear'
},false)

let btnCambiarRegion= document.getElementById('btnCambiarRegion');
btnCambiarRegion.addEventListener('click',()=>{

    opcion='editar'
},false)

let mostrarTabla =document.getElementById('mostarTabla');
mostrarTabla.addEventListener('click', ()=>{
    
    document.getElementById('container_1').style.display='block';
    document.getElementById('container_2').style.display='none';
    document.getElementById('container_3').style.display='none';
 
},false)

/*btnAgregarRegion.addEventListener('click',(e)=>{
    let inputRegion = document.getElementById('regionNueva')
    console.log(inputRegion.value);

    let bodyaEnviar = {
       nombre: inputRegion.value
    }

    let id, method = '';
    if(document.getElementById('regionNueva').dataset.id){
        id= document.getElementById('regionNueva').dataset.id;
        method = 'PUT';
    }else{
        id='';
        method= 'POST';
    }

    apiWarehouse('api/region', 'POST', JSON.stringify(bodyaEnviar), id)
    .then(resultado => {
        //console.log(resultado);
    }).catch (error => console.log(eror));
},false)
*/
//************mostrar regiones************ */
const mostrar= (regiones)=>{
   regiones.forEach(region => {
    resultados += `
    <tr>
        <td>${region.id}</td>
        <td>${region.nombre}</td>
        <td class="text-center"> <a class="edit" href="javascript:void(0)" title="Edit">
        <i class="fa fa-edit"></i>
        <a class="remove" href="javascript:void(0)" title="Remove">
        <i class="fa fa-trash"></i>
        </a></td>
        
    </tr>
    
    `
   })
   contenedor.innerHTML= resultados;
}


fetch(url)
.then(response =>response.json())
.then(data => mostrar(data))
.catch(error => console.log(error))

const on = (element, event, selector, handler)=>{
    element.addEventListener(event, e =>{
        if (e.target.closest(selector)){
            handler(e)
        }
    })
}

//**********************eliminar region***************** */
on(document, 'click', '.remove', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)
   
    
    alertify.confirm("¿Desea Eliminar el registro?",
    function(){
        fetch("http://127.0.0.1:3000/api/region/" +id, {
            
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

let idForm1 = 0
on(document, 'click', '.edit', e =>{
    const fila= e.target.parentNode.parentNode.parentNode
    idForm1= fila.children[0].innerHTML
    const regionForm1= fila.children[1].innerHTML
    console.log(regionForm1)

    regionNueva.value=regionForm1
    opcion='editar'
    document.getElementById('btnAgregarRegion').style.display= 'none';
    document.getElementById('btnCambiarRegion').style.display='block';
    

})

form1.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){
        //console.log(regionNueva.value)

        let bodyEnviar ={
            nombre: regionNueva.value
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
        fetch(url, fetchParams)
        .then(res=> res.json())
        .then(data =>{
            const nuevaRegion =[]
            nuevaRegion.push(data)
            mostrar(nuevaRegion)
           
        })
       
       // console.log('opcion crear')
    }
    if(opcion=='editar'){
        let bodyEnviar ={
            nombre: regionNueva.value
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
        fetch("http://127.0.0.1:3000/api/region/"+ idForm1, fetchParams)
        .then(res=> res.json())
        .then(data =>{
        
    
            const nuevaRegion =[]
            nuevaRegion.push(data)
            mostrar(nuevaRegion)
           
        })

        //console.log('opcion editar')


    }
})
