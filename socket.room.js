/**
 * Created by tintoll on 2017-02-06.
 */
const http = require('http');
const fs = require("fs");
const soketIo = require('socket.io');

const server = http.createServer(function(req,res){

    fs.readFile('HtmlRoomPage.html',function (err,data) {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
}).listen(52273,function () {
    console.log('Server running 52273');
});

//소켓 서버를 생성 및 실행합니다.
const io = soketIo.listen(server);
io.sockets.on("connection",function (socket) {

    var roomName = null;

    //join 이벤트 : 클라이언트가 특정한 방에 접속하게 만드는 이벤트
    socket.on("join",function (data) {
        roomName = data;
        socket.join(data);
    });

    //메시지 이벤트 : 같은 방에 속한 클라이언트에 메시지를 전달하는 이벤트
    socket.on("message",function (data) {
       io.sockets.in(roomName).emit('message','test');
    });
});

