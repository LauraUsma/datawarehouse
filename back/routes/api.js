

const router = require('express').Router();

//ruta para usuarios

const apiUsuarios= require('./api/usuarios');
router.use('/usuarios', apiUsuarios);


//ruta para sign

const apisign= require('./api/sign');
router.use('/sign', apisign);

//ruta para compañias

const apiComp= require('./api/companias');
router.use('/companias', apiComp);

//ruta para region

const apiRegion= require('./api/region');
router.use('/region', apiRegion);

//ruta para paises

const apiPais= require('./api/paises');
router.use('/paises', apiPais);

//ruta para ciudades

const apiCiudades= require('./api/ciudades');
router.use('/ciudades', apiCiudades);

//ruta para allregiones

const apiRegiones= require('./api/regiones');
router.use('/regiones', apiRegiones);

//ruta para contactos

const apiContactos= require('./api/contactos');
router.use('/contactos', apiContactos);








module.exports = router;