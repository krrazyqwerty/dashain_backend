const socketIO = require("socket.io");


const socketHandler = (server) => {
const io = socketIO(server);

io.on("connection", (socket)=>{
    console.log("New Connection Established");
    socket.on("join-event", (data)=>{
        console.log("User joind the event:", data.eventName)
    })
})


};


module.exports = socketHandler;