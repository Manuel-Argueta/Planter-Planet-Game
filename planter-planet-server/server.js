require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const superagent = require('superagent');

const port = process.env.PORT || 8080;
const mongoUri = process.env.URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Connecting to mongoDB
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error',console.error.bind(
    console, 'Could not connect to MongoDB...'));
db.once('open', () =>{
    console.log('Connection established with MongoDB');
});

// basic endpoint
app.get('/', (req,res)=> {
    res.status(200).send({
        status: 200,
        msg: "Server OK"
        });
});

//Add auth
app.get('/get-key', (req,res)=> {
    res.status(200).send({
        status: 200,
        key: process.env.CRYPT_KEY
        });
});


app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});