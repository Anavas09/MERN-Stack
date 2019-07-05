const express = require("express");
const app = express();

const morgan = require('morgan');
const bodyParser = require("body-parser")
const cors = require("cors");
const mongoose = require("mongoose")

const URI = 'mongodb://localhost/todos';

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(URI, { useNewUrlParser: true })
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("DB is connected")
})

app.use('/todos', require('./routes/todos.routes'))

app.use(morgan('dev'))

//Starting the server

app.listen(app.get('port'), ()=>{
    console.log(`Server running on port: ${app.get('port')}`)
})