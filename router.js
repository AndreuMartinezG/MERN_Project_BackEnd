const router = require('express').Router();

const UsersRouter = require('./views/UsersRouter');
const ThreadsRouter = require('./views/ThreadsRouter')

router.use('/users', UsersRouter);
router.use('/threads', ThreadsRouter);

module.exports = router;