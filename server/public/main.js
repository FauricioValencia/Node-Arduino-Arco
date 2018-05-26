const socket = io();

socket.on('dato',function(data) {
    console.log(data);
    let temp = document.getElementById('dato');
    temp.innerHTML = `${data}`;
})
socket.on('hora',function(hora) {
    
    let hor = document.getElementById('hora');
    hor.innerHTML = `${hora}`
})
socket.on('minuto',function(minuto) {
    
    let minu = document.getElementById('minuto');
    minu.innerHTML = `${minuto}`
})
socket.on('registro',function(registro) {
    
    let regi = document.getElementById('registro');
    regi.innerHTML = `${registro}`
})