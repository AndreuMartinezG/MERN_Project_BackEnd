

const db = () => {
    const mongoose = require('mongoose');
    // const clave = process.env.DB_CLAVE;
    // const database = process.env.DB_DATABASE;
    // const usuario = process.env.DB_USUARIO;
    // const cluster = process.env.DB_CLUSTER;

    const url = `mongodb+srv://admin:admin@cluster.veqhb.mongodb.net/MERN_Project_BackEnd?retryWrites=true&w=majority`;

    mongoose.connect(url, {
        useNewUrlPArser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Database creada')).catch(error => console.log('Alguun error ha ocurido', error))
}

module.exports = db;