const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("./socket_setup.js");


app.use(express.static(__dirname+"/public"));

io.attach(server);

server.listen(3000,()=>{
    console.log("Server online at port 5000");
});