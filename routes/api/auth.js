const express = require('express');
const router = express.Router();
const userCont = require('../../controllers/UserController');

router.post('/register', (req, res) => {
    userCont.create(req, res);
});

router.post('/login', (req, res) => {

});


module.exports = router;