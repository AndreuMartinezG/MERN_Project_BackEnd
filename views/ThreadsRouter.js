const express = require('express');
const router = express.Router();
const ThreadsController = require('../controllers/ThreadsController');



router.post('/', ThreadsController.threadCreation);

router.delete('/', ThreadsController.threadDelete);

router.get('/', ThreadsController.threadAll)

router.post('/post', ThreadsController.threadNewPost)

router.patch('/post', ThreadsController.threadUpdatePost);

router.post('/post/like', ThreadsController.threadPostIncrementLikes);

router.delete('/post', ThreadsController.threadPostDelete)

router.post('/post/:id', ThreadsController.threadPostGet)





module.exports = router