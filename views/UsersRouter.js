const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// AQUI VA EL CRUD de Users

router.post("/", async(req, res) => {
    try {
        const user = req.body;
        res.json(await UsersController.createUser(user));
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});




module.exports = router