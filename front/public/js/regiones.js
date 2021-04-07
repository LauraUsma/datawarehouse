let btnAgregarRegion= document.getElementById('btnAgregarRegion');

btnAgregarRegion.addEventListener('click',(e)=>{
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