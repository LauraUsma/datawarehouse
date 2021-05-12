//let btnguardarContacto = document.getElementById('guardarContacto');
/*
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

    let canal2 = document.getElementById('canal2');
    console.log(canal2.value);

    let cuenta2 = document.getElementById('cuentaUsuario2');
    console.log(cuenta2.value);

    let preferencias2 = document.getElementById('preferencias2');
    console.log(preferencias2.value);

    let canal3 = document.getElementById('canal3');
    console.log(canal3.value);

    let cuenta3 = document.getElementById('cuentaUsuario3');
    console.log(cuenta3.value);

    let preferencias3 = document.getElementById('preferencias3');
    console.log(preferencias3.value);




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
        id_canal:canal.value,
        cuenta: cuenta.value,
        preferencia:preferencias.value,
        id_canal2:canal2.value,
        cuenta2: cuenta2.value,
        preferencia2:preferencias2.value,
        id_canal3:canal3.value,
        cuenta3: cuenta3.value,
        preferencia3:preferencias3.value


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




//**********cargar canales******************* */

async function loadCanales1(){
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

loadCanales1();



async function loadCanales2(){

    const canal2 = document.getElementById('canal2');
    const resultado = await apiWarehouse ('api/canales', 'GET', '', '');
    console.log(resultado);
    resultado.rows.canales.forEach(row=> {
        const elemento = document.createElement('option');
        const textNode =document.createTextNode(row.canal);
        elemento.appendChild(textNode);
        elemento.setAttribute('value', row.id);
   ;
        canal2.add(elemento);
    });
    
}

loadCanales2();

async function loadCanales3(){

    const canal3 = document.getElementById('canal3');
    const resultado = await apiWarehouse ('api/canales', 'GET', '', '');
    console.log(resultado);
    resultado.rows.canales.forEach(row=> {
        const elemento = document.createElement('option');
        const textNode =document.createTextNode(row.canal);
        elemento.appendChild(textNode);
        elemento.setAttribute('value', row.id);
     
        canal3.add(elemento);
    });
    
}

loadCanales3();


