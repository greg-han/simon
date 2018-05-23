window.onload = init;
var padList = Object.freeze(["r","g","b","y"]);
//Here, you can use Json.parse Json.stringify
//or, alternatively, you can use arr.slice(0)
var sequence = ['r','g','b','y'];
var seuenceStack = [];
var seqCount = 0;
var inPlay = false;
var strict = false;
var turn = '';
var checkbox = document.getElementById("switch");
var redPad = document.getElementById("buttontl");
var greenpad = document.getElementById("buttontr");
var bluePad = document.getElementById("buttonbr");
var yellowPad = document.getElementById("buttonbl");
var numbers = document.getElementById("numtxt");
var padMap = {
  'r' : 'buttontl',
  'g' : 'buttontr',
  'b' : 'buttonbr',
  'y' : 'buttonbl'
};
var lightColorMap = {
  'r' : 'red',
  'g' : '#03d611',
  'b' : 'blue',
  'y' : 'yellow'
}
var regColors = {
  'r' : '#b24242',
  'g' : '#63b242',
  'b' : '#4275b2',
  'y' : '#e5e53c'
}
//toggles strictmode on or off.
//will only matter if the game is in play

function init(){
 turn = "simon";
}

function toggleOn(){
 if(checkbox.checked){
  strict = true;
  checkbox.checked = true;
 }
 else{
  strict = false;
  checkbox.checked = false;
 }
 console.log("strict",strict);
}


function selectBox(){
  return Math.floor(Math.random()*4);
}


function startGame(){
 seqCount = sequence.length;
 if(!inPlay){
  console.log(padList[selectBox()]);
 }//end of if the game is in play;
}

function restart(){
  inPlay = false;
  sequence = [];
  numbers.innerHTML = '00';
  seqCount = 0;
}

function changeTurn(){
 if(turn == 'human'){turn = 'simon';}
 else{turn = 'human';}
}

//All of the functions under this comment  control the lighting
//of theboard by simon
function setOff(offdoc,offcol){
 eval(offdoc).style.background = regColors[offcol];
 if(sequenceStack.length > 0){
  populateBoard();}
 else{
  changeTurn();
 }
}

function offPad(offcol,doci){
  setTimeout(function(){setOff(doci,offcol);},750);
}

function lightPad(col){
  var docID = eval(padMap[col]);
  docID.style.background = lightColorMap[col];
  offPad(col,docID);
}

function populateBoard(){
  var color = sequenceStack.pop();
  lightPad(color);
}

//end lighting functions;
function simonTurn(){
 sequenceStack = JSON.parse(JSON.stringify(sequence));
 populateBoard();
}




window.onload = init;
var padList = Object.freeze(["r","g","b","y"]);
//Here, you can use Json.parse Json.stringify
//or, alternatively, you can use arr.slice(0)
var sequence = ['r','g','b','y'];
var seuenceStack = [];
var seqCount = 0;
var inPlay = false;
var strict = false;
var turn = '';
var checkbox = document.getElementById("switch");
var redPad = document.getElementById("buttontl");
var greenpad = document.getElementById("buttontr");
var bluePad = document.getElementById("buttonbr");
var yellowPad = document.getElementById("buttonbl");
var numbers = document.getElementById("numtxt");
var padMap = {
  'r' : 'buttontl',
  'g' : 'buttontr',
  'b' : 'buttonbr',
  'y' : 'buttonbl'
};
var lightColorMap = {
  'r' : 'red',
  'g' : '#03d611',
  'b' : 'blue',
  'y' : 'yellow'
}
var regColors = {
  'r' : '#b24242',
  'g' : '#63b242',
  'b' : '#4275b2',
  'y' : '#e5e53c'
}
//toggles strictmode on or off.
//will only matter if the game is in play

function init(){
 turn = "simon";
}

function toggleOn(){
 if(checkbox.checked){
  strict = true;
  checkbox.checked = true;
 }
 else{
  strict = false;
  checkbox.checked = false;
 }
 console.log("strict",strict);
}


function selectBox(){
  return Math.floor(Math.random()*4);
}


function startGame(){
 seqCount = sequence.length;
 if(!inPlay){
  console.log(padList[selectBox()]);
 }//end of if the game is in play;
}

function restart(){
  inPlay = false;
  sequence = [];
  numbers.innerHTML = '00';
  seqCount = 0;
}

function changeTurn(){
 if(turn == 'human'){turn = 'simon';}
 else{turn = 'human';}
}

//All of the functions under this comment  control the lighting
//of theboard by simon
function setOff(offdoc,offcol){
 eval(offdoc).style.background = regColors[offcol];
 if(sequenceStack.length > 0){
  populateBoard();}
 else{
  changeTurn();
 }
}

function offPad(offcol,doci){
  setTimeout(function(){setOff(doci,offcol);},750);
}

function lightPad(col){
  var docID = eval(padMap[col]);
  docID.style.background = lightColorMap[col];
  offPad(col,docID);
}

function populateBoard(){
  var color = sequenceStack.pop();
  lightPad(color);
}

//end lighting functions;
function simonTurn(){
 sequenceStack = JSON.parse(JSON.stringify(sequence));
 populateBoard();
}





