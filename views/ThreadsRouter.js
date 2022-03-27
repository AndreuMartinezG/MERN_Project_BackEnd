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

//New Post
router.post('/post', ThreadsController.threadNewPost)

//Delete Post by id owner //////////////////////////////////////// POR TERMINAR ///////////////////////////////////////
router.delete('/post', ThreadsController.threadPostDelete)


//Traer Post de un user (id_owner)
router.get ('/post', ThreadsController.threadPostGet)





module.exports = router