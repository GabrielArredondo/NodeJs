const mongose = require('mongoose');
const produccion = process.env.MONGODB_URL;
const pruebas = process.env.MONGODB_URL;

mongose.connect(produccion,{
    useNewUrlParser: true
}).then(db =>console.log('db is conect')).catch(err => console.log(err));