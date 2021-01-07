const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // connect to our databse

require('dotenv').config();

const app = express();//create express server
const port = process.env.PORT || 5000;

app.use(cors()); //cors middleware
app.use(express.json())// allow us to pass json
// console.log(process.env)
//mongoose
const uri = process.env.ATLAS_URI; // mongodb uri
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true}); // start our database
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully")
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})