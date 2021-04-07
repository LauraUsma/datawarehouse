const urldb= 'http://127.0.0.1:3000/' ;

function headersdb(){
    const headers= new Headers();
    headers.append('Accept', 'application/json');
    headers.append('content-Type', 'application/json');
    headers.append( 'Authorization',`BEARER ${localStorage.getItem('token')}`);
return headers;
}


async function apiWarehouse(d_endpoint, d_method, d_body, d_params){
    try{
        const header = headersdb();
        const opciones = {
            method: d_method,
            headers: header,
            body:d_body
        }
        console.log(d_params);
        let resultado, parametro ='';
        if (d_params.trim()!== ''){
            parametro=`/${d_params}`;
        }
        if(d_method === 'GET'){
            resultado=await fetch (urldb + d_endpoint, {headers:header});
        }else{
            console.log(parametro);
            resultado= await fetch (urldb + d_endpoint + parametro, opciones);
        }
        const json =await resultado.json();
        const res ={
            resultado,rows:json
        }
        return res;
    } catch(error){
        console.log (error)
        return error
    }

}