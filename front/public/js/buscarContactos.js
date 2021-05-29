
let buscar = document.getElementById('buscar_Contactos')
let searchValueContactos = document.getElementById('my_input_search');
const contenedorSearch = document.getElementById('search_contactos')
const contenedor_contactos_all = document.getElementById('bodyContactos')

//let urlContacto = "http://127.0.0.1:3000/api/search/"+ searchValue;


const mostrar_search= (search)=>{
    console.log(search)
    search.search.forEach(buscar => {
    search += `
        <tr class="">
            <td class ="text-center "><input type="checkbox" id ="check_${buscar.id}" class="checkitem " value=""/> </td>
            <td>${buscar.id}</td>
            <td>${buscar.fullname}</td>
            <td>${buscar.email}</td>
            <td>${buscar.pais_region}</td>
            <td>${buscar.compania}</td>
            <td>${buscar.cargo}</td>
            <td>${buscar.interes}</td>
            <td class="text-center"> <a class="edit" href="javascript:void(0)" title="Edit">
            <i class="fa fa-edit"></i>
            <a class="remove" href="javascript:void(0)" title="Remove">
            <i class="fas fa-trash"></i>
            </a></td>
                
        </tr>
        
        `
    
    })
    contenedorSearch.innerHTML=search;
}

let params = {
    method: 'GET',
    headers:{
        'Content-Type':'application/json',  
        'Authorization': `BEARER ${localStorage.getItem('token')}`
      } 

}

function cargar_busqueda(){
    fetch("http://127.0.0.1:3000/api/search/" + searchValueContactos.value,params)
    .then(response =>response.json())
    .then (data => mostrar_search(data))
    .catch(error => console.log(error))
}





buscar.addEventListener('click',  ()=>{
    console.log(searchValueContactos.value)
    cargar_busqueda();


    if(searchValueContactos.value != null){
        document.getElementById('bodyContactos').style.display='none';
        document.getElementById('search_contactos').style.visibility='visible';

    
    
    }
    else if (searchValueContactos.value == ''){
        document.getElementById('search_contactos').style.display='none';
        document.getElementById('bodyContactos').style.visibility='visible';

    
    }
    
  
})


