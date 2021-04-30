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


    let array_canales = []

    let canales = document.getElementsByClassName('canales_contacto').length;
    console.log(canales.value)

    for(let i = 0; i < canales.length; i++){
        let canal = document.getElementById('canal').value;
        console.log(canal.value);
    
        let cuenta = document.getElementById('cuentaUsuario').value;
        console.log(cuenta.value);
    
        let preferencias = document.getElementById('preferencias').value;
        console.log(preferencias.value);


        let resultado_canal = {
            canal_id:canal.value,
            cuenta_usuario: cuenta.value,
            preferencia:preferencias.value
        }

        array_canales.add(resultado_canal)
    
    }



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
        canales_asociados :array_canales.value
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

/*
canales.firstElementChild.lastElementChild.value.forEach(canales=>{
    const element=document.createTextNode(canales.canal)
    console.log(element)
})

*/

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


//**********cargar ciudades******************* */

async function loadCiudades(){
    const ciudad = document.getElementById('ciudad');
    let pais_selected= document.getElementById('pais').value;
    console.log(pais_selected);

    if(pais_selected != 'Seleccionar País'){
        ciudad.innerHTML="";
        const resultado = await apiWarehouse ('api/ciudades/' + pais_selected, 'GET', '', '');
        console.log(resultado);
        
        resultado.rows.ciudades.forEach(row=> {
            const elemento = document.createElement('option');
            const textNode =document.createTextNode(row.ciudad);
            elemento.appendChild(textNode);
            elemento.setAttribute('value', row.id);
            ciudad.add(elemento);
            
        });
    
    }
    
}


loadCiudades()


//**********cargar regiones****************** */

async function loadRegiones() {
    const selected = document.getElementById('region');
    const resultado = await apiWarehouse('api/region', 'GET','','');
    console.log(resultado);

    resultado.rows.forEach(row=>{
    const elemento=document.createElement('option');
    const textNode = document.createTextNode(row.nombre);
    elemento.appendChild(textNode);
    elemento.setAttribute('value', row.id);
    selected.add(elemento);
});
selected.addEventListener('change', (e)=>{
    loadPaises();
    console.log("paises");
});
}
loadRegiones();


//**********cargar paises****************** */

async function loadPaises() {
    const selected = document.getElementById('pais');
    let region_selected = document.getElementById('region').value;
    console.log("region_selected");

    
    if (region_selected != 'Selecciona Región') {
        selected.innerHTML="";
        const resultado = await apiWarehouse('api/paises/'+ region_selected , 'GET','','');
        console.log(resultado);
        resultado.rows.paises.forEach(row=>{
            const elemento=document.createElement('option');
            const textNode = document.createTextNode(row.pais);
            elemento.appendChild(textNode);
            elemento.setAttribute('value', row.id);
            selected.add(elemento);

      
        })
      
    selected.addEventListener('change', (e)=>{
        loadCiudades();
        console.log("ciudades");
    });
  
    }
  
   
}




//**********cargar canales******************* */

async function loadCanales(){
    const canal = document.getElementById('canal');
    const resultado = await apiWarehouse ('api/canales', 'GET', '', '');
    console.log(resultado);
    resultado.rows.canales.forEach(row=> {
        const elemento = document.createElement('option');
        const textNode =document.createTextNode(row.canal);
        elemento.appendChild(textNode);
        elemento.setAttribute('value', row.id);
        canal.add(elemento);
        
    });
    
}

loadCanales();



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
  