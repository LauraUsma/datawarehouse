const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:33065/data_warehouse';
const sequelize = new Sequelize(path);

sequelize.authenticate().then(()=>{
    console.log('conexión exitosa...');
}).catch(err=>{
    console.log('error de conexión: ', err);
})

module.exports= sequelize;