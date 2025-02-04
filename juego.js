let imagenes = ["img/delegado1.jpg", "img/delegado2.jpg", "img/delegado3.jpg"];

let tiempoSlot1;
let manejarSlot1;

let numPartidas=0;
let numGanadas=0;
let numPerdidas=0;
let monedas=0;
let premio=0;

contadorPartidas();
contadorPartidasGanadas();
contadorPartidasPerdidas();

function cambiarImagen() {
    let aleatorio = parseInt(Math.random() * imagenes.length);
    document.getElementById("slot1").src = imagenes[aleatorio];
    console.log(aleatorio);

    let aleatorio2 = parseInt(Math.random() * imagenes.length);
    document.getElementById("slot2").src = imagenes[aleatorio2];
    console.log(aleatorio2);

    let aleatorio3 = parseInt(Math.random() * imagenes.length);
    document.getElementById("slot3").src = imagenes[aleatorio3];
    console.log(aleatorio3);
}

function tirada() {
    if(monedas==0){
        alert("No tienes monedas");
        return;
    }
    playSound();
    tiempoSlot1=100;
    clearInterval(manejarSlot1);
    manejarSlot1 = setInterval(cambiarImagen, tiempoSlot1);
    // setInterval(pararSlot1, 3000);
    setTimeout(() => {
        clearInterval(manejarSlot1);
        reducirtiempo(); 
        }, 3000);
    numPartidas++;
    contadorPartidas();
}

function reducirtiempo(){
    tiempoSlot1 += 500;
    clearInterval(manejarSlot1);
    manejarSlot1 = setInterval(cambiarImagen, tiempoSlot1);
    setTimeout(() => {
        clearInterval(manejarSlot1);
        comprobar();;   
    }, 2000);
}

function pararSlot1() {
    clearInterval(manejarSlot1);
}

function playSound(){
    let audio = document.getElementById("audio");
    audio.play();
}

function comprobar() {
    let slot1 = document.getElementById("slot1").src;
    let slot2 = document.getElementById("slot2").src;
    let slot3 = document.getElementById("slot3").src;

    if(slot1 == slot2 && slot2 == slot3){
        numGanadas++;
        contadorPartidasGanadas();
        monedas+=premio;
        actualizarMonedas();
        premio=0;
        actualizarPremio();
        alert("Has ganado");
    }
    else{
        numPerdidas++;
        contadorPartidasPerdidas();
        monedas=0;
        premio=0;
        actualizarPremio();
        actualizarMonedas();
        alert("Has perdido. Vuelve a intentarlo");
    }
}

function contadorPartidas() {
    document.getElementById("partidasJugadas").innerText = numPartidas;
}

function contadorPartidasGanadas() {
    document.getElementById("partidasGanadas").innerText = numGanadas;
}

function contadorPartidasPerdidas() {
    document.getElementById("partidasPerdidas").innerText = numPerdidas;
}

function agregarMoneda(){
    monedas+=100;
    calcularPremio();
    actualizarMonedas();
}

function actualizarMonedas() {
    document.getElementById("monedas").innerText = monedas;
}

function actualizarPremio() {
    document.getElementById("premio").innerText = premio;
}

function calcularPremio() {
    premio=monedas*2;
    actualizarPremio();
}