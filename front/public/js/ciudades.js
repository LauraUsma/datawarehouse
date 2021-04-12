let btnCrearCiudad = document.getElementById('btnCrearCiudad');

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

},false)


async function loadPaises() {
    const selected = document.getElementById('seleccionaPais');
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




