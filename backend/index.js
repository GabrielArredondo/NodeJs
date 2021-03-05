if(process.env.NODE_ENV !== 'produccion'){
    require('dotenv').config();
}
require('dotenv').config();
//require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();
require('./Models/Dao/Persistence/dataBase');
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    //Para almecenar las imagenes
    destination: path.join(__dirname,'Public/uploads'), 
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image')); //Para entender las imagenes que se suban al servidor
app.use(express.urlencoded({extended:false}));
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

app.use(cors());
//Para soportar JSON
app.use(express.json());

//Routes
//app.use('/api/books', require('./routes/books'));
app.use('/api/booksController', require('./Controller/routes/booksController'));
//Static files

app.use(express.static(path.join(__dirname, 'Public')));
//start the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});