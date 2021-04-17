
const express = require('express');
const app =express();
const apiRouter = require('./routes/api');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const jwtClave= "p40y3c70cu47r0_Ac4m1c4";
const expressJwt = require('express-jwt');
//const path = require('path');




app.use(expressJwt({ secret: jwtClave, algorithms: ['sha1', 'RS256', 'HS256']}).unless({ path: ["/api/sign", "/api/usuarios/all", "/api/companias", "/api/companias/detalles", "/api/region", "/api/paises", "/api/ciudades", "/api/regiones", "/api/contactos"] }));
app.use(express.json());
app.use(cors());
app.use('/api',apiRouter);


app.set('port', 3000);

require('./database');



app.listen(app.get('port'),()=>{
    console.log('servidor iniciado');
})

/*
app.use((err, req, res, next) => {
    if (!err) {
        next();
    } else {
        console.log(JSON.stringify(err));
        res.status(500).send({status: 500, mensaje:'Ha ocurrido un error inesperado'})
    }
})

*/