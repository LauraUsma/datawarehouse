let btnCrearPais = document.getElementById('btnCrearPais');

btnCrearPais.addEventListener('click', (e)=>{
    let region_id = document.getElementById('seleccionaRegion');
    console.log(region_id.value)
    let inputregionPais=document.getElementById('regionPais');
    console.log(inputregionPais.value)

    let bodyEnviar = {
       
        nombre: inputregionPais.value,
        region_id: region_id.value
     }

     let id, method = '';
     if(document.getElementById('regionPais').dataset.id){
         id= document.getElementById('regionPais').dataset.id;
         method = 'PUT';
     }else{
         id='';
         method= 'POST';
     }
 
     apiWarehouse('api/paises', 'POST', JSON.stringify(bodyEnviar), id)
     .then(resultado => {
         console.log(resultado);
     }).catch (error => console.log(eror));

},false)


async function loadRegiones() {
    let region = document.getElementById('seleccionaRegion');
    let resultado = await apiWarehouse('api/region', 'GET','','');
    console.log(resultado);

    resultado.rows.regiones.forEach (row=>
        {
    const element=document.createElement('option');
    const textNode = document.createTextNode(row.nombre);
    element.appendChild(textNode);
    element.setAttribute('value',row.region_id);
    region.add(element);
});

}
loadRegiones();



