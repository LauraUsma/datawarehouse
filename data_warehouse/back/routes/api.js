

const router = require('express').Router();
/*
// ruta para pedidos
const apiPedidos= require('./api/pedidos');
router.use('/pedidos', apiPedidos);


//ruta para productos
const apiProductos= require('./api/productos');
router.use('/productos', apiProductos);

*/
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







module.exports = router;