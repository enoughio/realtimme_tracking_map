import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function (socket) {
    socket.on("send-location", (data)=>{
        io.emit("receive-location", {id: socket.id, ...data});
    })
    console.log('connected to socket');
})  

io.on('disconnect', ()=>{
    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", secket.id)
    })
});


app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
