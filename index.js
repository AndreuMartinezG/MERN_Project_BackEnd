const express = require('express');
const app = express();
const cors = require('cors');
let PORT = process.env.PORT || 5000;
const router = require('./router');
const db = require('./db.js');


let corsOptions = {//CONFIGURO OPCIONES DE CORS
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//Middleware

app.use(express.json()); //PUEDO OBTENER JSON DEL BODY
app.use(cors(corsOptions));  //USO CORS
app.use(router);

db()

app.listen(PORT, () => console.log(`Server on port ${PORT}`)); //Conectado a la base de datos
