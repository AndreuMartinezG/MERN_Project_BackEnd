const express = require('express');
const router = express.Router();
const ThreadsController = require('../controllers/ThreadsController');


// AQUI VA EL CRUD Threads

//Creacion nuevo Thread
router.post('/', ThreadsController.threadCreation);

//Eliminar un thread por Id
router.delete('/', ThreadsController.threadDelete);

//Traer todos los threads
router.get('/', ThreadsController.threadAll)





module.exports = router