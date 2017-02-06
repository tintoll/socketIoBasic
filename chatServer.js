/**
 * Created by tintoll on 2017-02-06.
 */
const http = require('http');
const fs = require("fs");
const soketIo = require('socket.io');

const server = http.createServer(function(req,res){

    //fs.readFile('chatPage.html',function (err,data) {
    fs.readFile('chatMobile.html',function (err,data) {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
}).listen(52273,function () {
    console.log('Server running 52273');
});


const io = soketIo.listen(server);
io.sockets.on("connection",function (socket) {

    socket.on('message',function (data) {
        io.sockets.emit('message',data);
    });
});

