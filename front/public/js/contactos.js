
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
    //console.log(pais_selected);

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


