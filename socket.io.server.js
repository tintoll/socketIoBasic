/**
 * Created by tintoll on 2017-02-06.
 */
const http = require('http');
const fs = require("fs");
const soketIo = require('socket.io');

const server = http.createServer(function(req,res){

    fs.readFile('HtmlPage.html',function (err,data) {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
}).listen(52273,function () {
    console.log('Server running 52273');
});

//소켓 서버를 생성 및 실행합니다.
const io = soketIo.listen(server);
io.sockets.on("connection",function (socket) {
    //소켓이벤트를 연결합니다.
    socket.on("rint",function (data) {
       console.log('Client send Data : '+data);

        //소켓 이벤트를 발생시킵니다.
        socket.emit('smart',data);

        //public 방식
        //io.sockets.emit('smart',data);
        //broadcast
        //socket.broadcast.emit('smart',data);
        //private
        //io.sockets.to(id).emit('smart',data);
    });
});

/*
    소켓통신방식 3가지
    public : 자신을 포함한 모든 클라이언트에게 데이터를 전달
    broadcast : 자신을 제외한 모든 클라이언트에게 데이터를 전달
    private : 특정 클라이언트에 데이터를 전달
 */