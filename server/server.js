const http = require('http');
const  express =require ('express');
const socketIO = require('socket.io');
var registro= [];
var hayMovimiento = [];

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server)
/*con el proceso de arriba ya se tiene la conexion del servidor con los webs sockets.io */

app.use(express.static(__dirname+'/public'));

server.listen(3000, function (){
    console.log('server listening on port', 3000);
})

//SERIAL COMUNICATION
const Serialport =require('serialport');
const Readline = Serialport.parsers.Readline;

const port = new Serialport('/dev/ttyACM0',{


    baudRate: 9600//para que puedan transmiter a la misma velocidad
});

const parser = port.pipe(new Readline({delimeter : '\r\n'}));

parser.on('open', function (){
    console.log('connection is openend');
});

parser.on('data',function (data){
    var d = new Date();

    let hora =d.getHours();
    let minuto =d.getMinutes();

    let juntos = `      ${data} - ${hora}: ${minuto}`
    io.emit('hora',hora);
    io.emit('minuto',minuto);
    io.emit('registro',registro);
    // console.log(data);
    // if(data =="1"){
    //     data="hay movimiento"
    // }else if(data =="0"){
    //     data="no hay movimiento"
    // }
    io.emit('dato',data);//se coloca los datos que se vana  enviar
    io.write("\n");
   // console.log(data);
   registro.push(juntos);
   //console.log(registro);

});
port.on('error', function (err){
    console.log(err);
})