const express = require('express');
const router = express.Router();
const userCont = require('../../controllers/UserController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    userCont.create(req, res);
});

router.post('/login', async (req, res) => {
    let foundUser = await userCont.findByEmail(req, res);
    console.log(foundUser);
    if (await bcrypt.compare(req.body.password, foundUser.password)) {
        const accessToken = jwt.sign({ _id: foundUser._id, username: foundUser.email }, process.env.SECRET);
        res.json({ accessToken });
    } else {
        res.json("Login failed!");
    }
});


module.exports = router;