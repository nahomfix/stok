const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const userCont = require('./controllers/UserController');
const authRoute = require('./routes/api/auth');
const jwt = require('jsonwebtoken');

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (!err) {
        console.log("Success");
    } else {
        console.log("Failure");
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoute);

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/dashboard', authenticateJWT, (req, res) => {
    res.json('Can be viewed by REGISTERED ONLY...');
});

app.get('/', (req, res) => {
    userCont.findAll(req, res);
});

app.get('/:id', (req, res) => {
    userCont.findOne(req, res);
});

app.delete('/:id', (req, res) => {
    userCont.delete(req, res);
});

app.put('/:id', (req, res) => {
    userCont.updateUser(req, res);
});




app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});