const express = require('express');
const app = express();
const port = 2000;
const dbConnect = require('./db');
const path = require('path')

// calling db function
dbConnect();

// use middleware to use req.body
// For parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('.ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//set template engine
app.set("view engine","ejs");

// importing Routes here
app.use('',require('./routes/auth'));
app.use('',require('./routes/book'));
app.use('',require('./routes/history'));

// server listening
app.listen(port,()=>{
    console.log(`server is listening on ${port} `)
})