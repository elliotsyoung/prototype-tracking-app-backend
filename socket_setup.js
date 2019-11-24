// Instantiate io without attaching server
// the io object can be exported and used to emit socket events anywhere
const io = require("socket.io")();

io.on("connection", (socket)=>{
    console.log(`${socket.id} -> new socket connection id`);
    // setInterval(()=>{
    //     socket.emit("truck-position-update", {lattitude: (Math.random()*1000), longitude:(Math.random()*1000)});
    // },1000)
    socket.on('client-ping', (data)=>{
        console.log(data);
        
        console.log(`server-ping request from ${socket.id}. Message: ${data}`);
        socket.emit('server-ping', `The server received your request at ${(new Date()).toString()}`)
    });

    socket.on("truck-position-update", (event)=>{
        console.log("new truck position");
        console.log(event);
        
        socket.broadcast.emit("truck-position-update", event);
    });
    socket.on("info-window-update", (newText)=>{
        console.log("new info window text:" + newText);
        
        socket.broadcast.emit("info-window-update", newText);
    });
});
module.exports = io;