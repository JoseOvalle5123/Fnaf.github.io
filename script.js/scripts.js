let intentos = 0;
let aciertos = 0;
let cards = ["Freddy.jpg", "Chica.jpg", "Golden Freddy.jpg", "Bonnie.jpg"];
let tablero = [];
let Cardset; // deck de cartas

let rows = 2;
let columns = 4;

let carta1;
let carta2;

let voltearerror1;
let voltearerror2;

// 🔀 Función para revolver el arreglo
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function clickencarta() {
  if (carta1 == null) {
    let coordenadacartita = this.id;
    let x = parseInt(coordenadacartita[0]);
    let y = parseInt(coordenadacartita[1]);
    carta1 = tablero[x][y];
    voltearerror1 = document.getElementById(coordenadacartita);
    voltearerror1.src = "assets/images/" + tablero[x][y];
  } else {
    let coordenadacartita = this.id;
    let x = parseInt(coordenadacartita[0]);
    let y = parseInt(coordenadacartita[1]);
    carta2 = tablero[x][y];
    voltearerror2 = document.getElementById(coordenadacartita);
    voltearerror2.src = "assets/images/" + tablero[x][y];

    // comparar
    if (carta1 != null && carta2 != null) {
      if (carta1 == carta2) {
        aciertos++;
        document.getElementById("conta1").innerText = aciertos;
        carta1 = null;
        carta2 = null;
      } else {
        setTimeout(ocultarpares, 1000);
      }
    }
  }
}

function ocultarpares() {
  intentos++;
  voltearerror1.src = "assets/images/reversodecarta.jpg";
  voltearerror2.src = "assets/images/reversodecarta.jpg";
  carta1 = null;
  carta2 = null;

  // 🔀 Revolver cartas después de ocultar
  desordenarTablero();
}

function desordenarTablero() {
  // Tomar todas las cartas actuales que NO están encontradas aún
  let todasLasCartas = tablero.flat();
  shuffle(todasLasCartas);

  tablero = [];
  document.getElementById("tablero").innerHTML = "";

  for (let r = 0; r < rows; r++) {
    let renglon = [];
    for (let c = 0; c < columns; c++) {
      let card = todasLasCartas.pop();
      renglon.push(card);

      let cardtablero = document.createElement("img");
      cardtablero.id = r.toString() + c.toString();
      cardtablero.src = "assets/images/reversodecarta.jpg"; // siempre boca abajo después del shuffle
      cardtablero.addEventListener("click", clickencarta);
      cardtablero.classList.add("carddimension");

      document.getElementById("tablero").append(cardtablero);
    }
    tablero.push(renglon);
  }
}

function start() {
  aciertos = 0;
  intentos = 0;
  carta1 = null;
  carta2 = null;
  document.getElementById("conta1").innerText = aciertos;
  document.getElementById("tablero").innerHTML = "";
  tablero = [];

  Cardset = cards.concat(cards); // duplicar cartas
  shuffle(Cardset); // 🔀 revolver

  for (let r = 0; r < rows; r++) {
    let renglon = [];
    for (let c = 0; c < columns; c++) {
      let card = Cardset.pop();
      renglon.push(card);

      let cardtablero = document.createElement("img");
      cardtablero.id = r.toString() + c.toString();
      cardtablero.src = "assets/images/" + card;
      cardtablero.addEventListener("click", clickencarta);
      cardtablero.classList.add("carddimension");

      document.getElementById("tablero").append(cardtablero);
    }
    tablero.push(renglon);
  }

  setTimeout(hide, 3000);
}

function hide() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + c.toString());
      card.src = "assets/images/reversodecarta.jpg";
    }
  }
}

// Iniciar automáticamente al cargar
window.onload = start;
