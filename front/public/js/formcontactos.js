let btnAgregar = document.getElementById('agregarCanal');
let formContactos= document.getElementById('formAgregarContactos')

let optionsContactos =["Seleccionar Canal","Telefono", "Twitter", "LinkedIn"]
let opcionesPreferencia = ["Sin Preferencia","canal Favorito", "No Molestar"]


btnAgregar.addEventListener('click', ()=>{
   
    let divModal = document.createElement('div')
    let divContacto = document.createElement('div')
    let divCuenta = document.createElement('div')
    let divPreferencia = document.createElement('div')

    let labelContacto = document.createElement('label')
    labelContacto.setAttribute('class', 'canal')
    labelContacto.innerText= 'Canal de Contacto'

    let selectContacto =document.createElement('select')

    let labelCuenta =document.createElement('label')
    labelCuenta.innerText='Cuenta De Usuario'
    labelCuenta.setAttribute('class', 'col-sm-12 col-form-label')

    let inputCuenta = document.createElement('input')
    inputCuenta.setAttribute('class', 'form-control colorInput')
    inputCuenta.setAttribute('placeholder', '@ejemplo')

    let labelPreferencia = document.createElement('label')
    labelPreferencia.innerText='Preferencias'
    let selectPreferencia =document.createElement('select')

    
    divContacto.appendChild(labelContacto)
    divContacto.appendChild(selectContacto)
    divContacto.setAttribute('class','contact2')
    divContacto.setAttribute('class', 'labelBody')
    divModal.setAttribute('class', 'modal5')

    divCuenta.setAttribute('class','contact3 labelBody cuentaUsuario')
    divCuenta.appendChild(labelCuenta)
    divCuenta.appendChild(inputCuenta)

    divPreferencia.setAttribute('class','contact3 labelBody')
    divPreferencia.appendChild(labelPreferencia)
    divPreferencia.appendChild(selectPreferencia)

    
    for(let i = 0; i< optionsContactos.length; i++){
        let optionContacto= document.createElement('option')
        optionContacto.value = optionsContactos[i];
        optionContacto.text = optionsContactos[i];
        selectContacto.appendChild(optionContacto)
        selectContacto.setAttribute('class', 'form-control')

    }

    for(let i = 0; i< opcionesPreferencia.length; i++){
        let optionPreferencia= document.createElement('option')
        optionPreferencia.value = opcionesPreferencia[i];
        optionPreferencia.text = opcionesPreferencia[i];
        selectPreferencia.appendChild(optionPreferencia)
        selectPreferencia.setAttribute('class', 'form-control colorInput')

    }

    divModal.appendChild(divContacto)
    divModal.appendChild(divCuenta)
    divModal.appendChild(divPreferencia)


    formContactos.appendChild(divModal)
    
    
    return false;

})

