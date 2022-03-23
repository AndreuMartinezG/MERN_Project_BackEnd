const router = require('express').Router();

const UsuariosRouter = require('./views/UsuariosRouter');


router.use('/usuarios', UsuariosRouter);

module.exports = router;