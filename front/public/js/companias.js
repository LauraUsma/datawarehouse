let btnCompania = document.getElementById('btnCrearCompania');

btnCompania.addEventListener('click', (e)=>{
    let nombre = document.getElementById('nombreCompania');
    console.log(nombre.value);

    let direccion = document.getElementById('direCompania');
    console.log(direccion.value);

    let email = document.getElementById('emailCompania');
    console.log(email.value);

    let telefono =document.getElementById('telCompania');
    console.log(telefono.value);

    let ciudades = document.getElementById('ciudadCompania');
    console.log(ciudades.value);

    let bodyaEnviar={
        nombre:nombre.value, 
        direccion:direccion.value,
        email: email.value,
        telefono:telefono.value,
        id_ciudades:ciudades.value,

    };
    let id, method = '';
    if(document.getElementById('nombreCompania').dataset.id){
        id = document.getElementById('nombreCompania').dataset.id;
        method='PUT';
        

    }else{
        id='';
        method= 'POST';
    }

    apiWarehouse('api/companias', method, JSON.stringify(bodyaEnviar), id)
    .then(resultado => {
        console.log(resultado);
    }).catch (error => console.log(eror));


},false);


async function loadCiudades(){
    const ciudad = document.getElementById('ciudadCompania');
    const resultado = await apiWarehouse ('api/ciudades', 'GET', '', '');
    console.log(resultado);
    resultado.rows.forEach(row=> {
        const elemento = document.createElement('option');
        const textNode =document.createTextNode(row.nombre);
        elemento.appendChild(textNode);
        elemento.setAttribute('value', row.id);
        ciudad.add(elemento);
        
    });
    
}

loadCiudades();



//*****************funcion para eliminar los registros de usuarios****************** */
function deleteCompanias (id) {
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
    fetch('http://127.0.0.1:3000/api/companias', fetchParams)
    .then(res=> res.json())
    .then(json=> console.log(json));
  }
  