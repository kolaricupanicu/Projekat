var trenutnaBoja = null
var pogresanOdgovor = [];
var odgovor = [];
var pogodak = [];
var noviPogodakNiz = []
var pogresniPogodci = [];

var boje = [
  "#40e0d0",
  "#ffffff",
  "#c11cc1",
  "#000000",
  "#0000ff",
  "#ff0000",
  "#008000",
  "#ffff00"
]


var bojeObjekat = {
 
  "#40e0d0": "SvetloPlava", 
  "#ffffff": "Bela",
  "#c11cc1": "Ljubicasta",
  "#000000": "Crna",
  "#0000ff": "Plava",
  "#ff0000": "Crvena",
  "#008000": "Zelena",
  "#ffff00": "Zuta"
}


function napraviBojuIzborElement(id,boja){
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(25,25,25,0,2*Math.PI);
    
    ctx.fillStyle=boja; 
    ctx.fill(); 

    c.onclick = function(){
      promeniKursor(this);  
    }  
    
}

function napraviBojuIzbor(){
  for (var i =0; i<boje.length ; i++){
    napraviBojuIzborElement("polje" + i, boje[i])
  }
}


function napraviRed() {
  var red = document.createElement("ul");
  red.innerHTML =
  '<li class="prazno polje_0"></li>' +
  '<li class="prazno polje_1"></li>' +
  '<li class="prazno polje_2"></li>' +
  '<li class="prazno polje_3"></li>'
  return red;
}

function napraviDelove() {
  var delovi= document.createElement("li");
  delovi.classList.add('deo_lista'); // ili  delovi.className = 'deo_lista';
  
  delovi.innerHTML =
  '<div class = "deo"></div>' +
  '<div class = "deo"></div>' +
  '<div class = "deo"></div>' +
  '<div class = "deo"></div>'
  return delovi;
}


function napraviTablu(){
  var praznaPolja = document.querySelector("#praznaPolja");
  for (var i = 0; i < 10; ++i) {
    praznaPolja.appendChild(napraviRed());
  }
  var deo_lista_m = document.getElementsByTagName("ul")
  for (var i = 1; i <= 10; ++i) {
    deo_lista_m[i].appendChild(napraviDelove());
  }
  var deo_liste = document.getElementsByClassName("deo_lista")
  console.log(deo_liste)
  for (var i = 0; i < 10; ++i) {
    deo_liste[i].setAttribute("id", "deo_lista" + i)
  }
}


function dodajKlikBoju(){
  for (var i = 0; i < 4; i++){
    var element = document.getElementsByClassName('prazno')[i]
    
    element.onclick = function(){  promeniBoju(this)  };
    element.classList.add("activan")
  }
}

function ukloniKlikBoju(){
  var lopticaB= document.getElementsByClassName('lopticaB')
  for (var i = 0; i < lopticaB.length; i++){

  lopticaB[i].onclick = function(){};

  }
}

function promeniKursor(el){
  var mojdeo = document.getElementsByTagName('html');
  trenutnaBoja = el.getContext("2d").fillStyle;
  console.log(trenutnaBoja);
 
}



function napraviOdgovor(){
  while(odgovor.length < 4){
    var nasumicno = Math.floor(Math.random() * boje.length);
      odgovor.push(boje[nasumicno]);
  }
  var stringOdgovor = "";
  for (var i = 0; i < odgovor.length; i++){
    stringOdgovor += bojeObjekat[odgovor[i]] + " ";

  }
  console.log("trenutni odgovor je: ", stringOdgovor);
  return odgovor;
}




document.querySelector('.btn1').onclick = proveriPogodak;  



function proveriPogodak(){
    if (pogodak.length === 4){
      var pogodci = []; 
   
   
      for (var i = 0; i < pogodak.length; i++){
        pogodci.push(pogodak[i])
      }
    pogresniPogodci.push(pogodci)
    noviPogodakNiz = pogodci;
    uporediOdgovor(odgovor, pogodak);
    pogodak = [];
    dodajKlikBoju();
    ukloniKlikBoju();
 }
  
};



function promeniBoju(el){
  if (trenutnaBoja){
    
    el.classList.remove("prazno");
    
    el.classList.remove("aktivan"); 
    el.classList.add("lopticaB")
 
    if (el.classList.contains('polje_0')){
      pogodak[0] = trenutnaBoja;
    } else if (el.classList.contains('polje_1')){
      el.classList.remove('prazno');
      pogodak[1] = trenutnaBoja;
    } else if (el.classList.contains('polje_2')){
      pogodak[2] = trenutnaBoja;
    } else if (el.classList.contains('polje_3')){
      pogodak[3] = trenutnaBoja;
    }
    console.log(pogodak.length);
    el.style.background = trenutnaBoja;
  }
}



function uporediOdgovor(odgovor, pogodak){
  var tacanBroj = 0;
  var blizupogBroj = 0;
  var trOdgovor = odgovor.slice(); 
  var trPogodak = pogodak.slice();
  for (var i = 0; i < odgovor.length; i++){
    if (trOdgovor[i] === trPogodak[i]){
      tacanBroj++;
      trOdgovor[i] = NaN;
      trPogodak[i] = NaN;
    }
  }
  for (var i = 0; i < odgovor.length; i++){
    for (var j = 0; j < odgovor.length; j++){
      if (trOdgovor[i] === trPogodak[j]){
       blizupogBroj++
       trOdgovor[j] = NaN;
      trPogodak[j] = NaN;
      }
    }
  }
  proveriPogadjanje(tacanBroj, blizupogBroj)
}

function proveriPogadjanje(tacanBroj, blizupogBroj){
  if (tacanBroj == 4){
    alert("pobeda!")
  } else if (pogresanOdgovor.length>=10){
    var stringOdgovor = "";
    for (var i = 0; i < odgovor.length; i++){
      stringOdgovor += bojeObjekat[odgovor[i]] + " ";
    }
    alert(`izgubili ste resenje je` + stringOdgovor);
    
  
  } else { 
    vratiDelove(tacanBroj, blizupogBroj)
  }
}


function vratiDelove(tacanBroj, blizupogBroj){

  var delovi = document.querySelector("#deo_lista" + (pogresniPogodci.length - 1));
    console.log('tacanBroj=',tacanBroj);
    console.log('blizupogBroj=',blizupogBroj);
  for (var i = 1; i <= tacanBroj; i++){
    console.log('1. i=',i);
   
    delovi.querySelector('div:nth-child('+i+')').style.background = "green";
    delovi.querySelector('div:nth-child('+i+')').style.border = "1px solid green";
  }
  var novBroj =  blizupogBroj+tacanBroj;
  for (var i = tacanBroj+1; i <= novBroj; i++){
    console.log('2. i=',i);
    
    delovi.querySelector('div:nth-child('+i+')').style.background = "red";
    delovi.querySelector('div:nth-child('+i+')').style.border = "1px solid red";

  }


  
 }



 
var dugme= document.querySelector('.btn2');
dugme.onclick = novaIgra;  
function novaIgra(){
  



}



 


  








document.querySelector('#uputstvoLink').onclick = otvoriObavestenje;

function otvoriObavestenje() {
document.getElementById('mojeObavestenje').style.display = "block";
}

document.querySelector('.zatvori').onclick = zatvoriObavestenje;

function zatvoriObavestenje() {
document.getElementById('mojeObavestenje').style.display = "none";
}



napraviBojuIzbor();
napraviTablu();
napraviOdgovor();
dodajKlikBoju();




