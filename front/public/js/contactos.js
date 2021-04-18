let btnguardarContacto = document.getElementById('guardarContacto');

btnguardarContacto.addEventListener('click', (e)=>{
    let nombre = document.getElementById('nombre');
    console.log(nombre.value);

    let apellido = document.getElementById('apellido');
    console.log(apellido.value);

    let cargo = document.getElementById('cargo');
    console.log(cargo.value);

 
    let email = document.getElementById('email');
    console.log(email.value);

    let compania =document.getElementById('compania');
    console.log(compania.value);

    let region =document.getElementById('region');
    console.log(region.value);

    let pais =document.getElementById('pais');
    console.log(pais.value);

    let ciudad =document.getElementById('ciudad');
    console.log(ciudad.value);

    let direccion = document.getElementById('direccion');
    console.log(direccion.value);

    let interes = document.getElementById('interes');
    console.log(interes.value);

    let canal = document.getElementById('canal');
    console.log(canal.value);

    let cuenta = document.getElementById('cuentaUsuario');
    console.log(cuenta.value);

    let preferencias = document.getElementById('preferencias');
    console.log(preferencias.value);




    let bodyaEnviar={
        nombre:nombre.value, 
        apellido:apellido.value,
        cargo: cargo.value,
        email: email.value,
        id_companias:compania.value,
        id_region: region.value,
        id_pais: pais.value,
        id_ciudad:ciudad.value,
        direccion:direccion.value,
        interes:interes.value,
        canal: canal.value,
        cuenta:cuenta.value,
        preferencias:preferencias.value

    };
    let id, method = '';
    if(document.getElementById('nombre').dataset.id){
        id = document.getElementById('nombre').dataset.id;
        method='PUT';
        

    }else{
        id='';
        method= 'POST';
    }

    apiWarehouse('api/contactos', method, JSON.stringify(bodyaEnviar), id)
    .then(resultado => {
        console.log(resultado);
    }).catch (error => console.log(eror));


},false);


//**********cargar companias****************** */

async function loadCompanias() {
    const selected = document.getElementById('compania');
    const resultado = await apiWarehouse('api/companias', 'GET','','');
    console.log(resultado);

    resultado.rows.forEach(row=>{
    const elemento=document.createElement('option');
    const textNode = document.createTextNode(row.nombre);
    elemento.appendChild(textNode);
    elemento.setAttribute('value', row.id);
    selected.add(elemento);
});

}
loadCompanias();



//**********cargar regiones****************** */

async function loadRegiones() {
    const selected = document.getElementById('region');
    const resultado = await apiWarehouse('api/regiones', 'GET','','');
    console.log(resultado);

    resultado.rows.forEach(row=>{
    const elemento=document.createElement('option');
    const textNode = document.createTextNode(row.region);
    elemento.appendChild(textNode);
    elemento.setAttribute('value', row.id);
    selected.add(elemento);
});

}
loadRegiones();





//**********cargar paises****************** */

async function loadPaises() {
    const selected = document.getElementById('pais');
    const resultado = await apiWarehouse('api/paises', 'GET','','');
    console.log(resultado);

    resultado.rows.pais.forEach(row=>{
    const elemento=document.createElement('option');
    const textNode = document.createTextNode(row.nombre);
    elemento.appendChild(textNode);
    elemento.setAttribute('value', row.id);
    selected.add(elemento);
});

}
loadPaises();


//**********cargar ciudades******************* */

async function loadCiudades(){
    const ciudad = document.getElementById('ciudad');
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
  