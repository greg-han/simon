window.onload = init;
var tlPadSound;
var trPadSound;
var brPadSound;
var blPadSound;
var padList = Object.freeze(["r","g","b","y"]);
//Here, you can use Json.parse Json.stringify
//or, alternatively, you can use arr.slice(0)
//var sequence = ['r','g','y','y','y'];
var restart = false;
var started = false;
var sequence = [];
var seuenceStack = [];
var resetStack = [];
var seqCount = 0;
var strict = false;
var restart = false;
var turn = '';
var checkbox = document.getElementById("switch");
var redPad = document.getElementById("buttontl");
var greenpad = document.getElementById("buttontr");
var bluePad = document.getElementById("buttonbr");
var yellowPad = document.getElementById("buttonbl");
var numbers = document.getElementById("numtxt");
var padArr = [ 'buttontl', 'buttontr','buttonbr','buttonbl'];
var padMap = {
  'r' : 'buttontl',
  'g' : 'buttontr',
  'b' : 'buttonbr',
  'y' : 'buttonbl'
};
var domMap = {
 'buttontl' : 'redPad',
 'buttontr' : 'greenPad',
 'buttonbr' : 'bluePad',
 'buttonbl' : 'yellowPad'
}
var soundMap = {
 'buttontl' : 'tlPadSound',
 'buttontr' : 'trPadSound',
 'buttonbr' : 'brPadSound',
 'buttonbl' : 'blPadSound'
}
var idcolMap = {
  'buttontl' : 'r',
  'buttontr' : 'g',
  'buttonbr' : 'b',
  'buttonbl' : 'y'
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
  tlPadSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  trPadSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  brPadSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  blPadSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
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
}

function selectBox(){
  return padList[Math.floor(Math.random()*4)];
}

function startGame(){
 if(!started){
  started = true;
  allNorm();
  simonTurn();
   //end of if the game is in play;
 }
}

function startOver(){
  allRed();
  setTimeout(function(){allNorm()},750);
  sequence = [];
  sequenceStack = [];
  numbers.innerHTML = '00';
  seqCount = 0;
  updateDisplay();
  started = false;
}

function changeTurn(){
 if(turn == 'human'){ simonTurn();}
 if(turn=='simon'){ humanTurn();}
}

//All of the functions under this comment  control the lighting
//of theboard by simon
function setOff(offdoc,offcol){
 eval(offdoc).style.background = regColors[offcol];
 if(sequenceStack.length > 0){
  //setTimeout(function(){populateBoard();},750);
 populateBoard();
 }
 else{
  if(restart){restart = false;};
  sequenceStack = [];
  changeTurn();
 }
}

function offPad(offcol,doci){
  setTimeout(function(){setOff(doci,offcol);},750);
}

function lightPad(col){
  var docID = eval(padMap[col]);
  eval(soundMap[String(docID.id)]).play();
  docID.style.background = lightColorMap[col];
  offPad(col,docID);
}

function populateBoard(){
  var color = sequenceStack.pop();
  setTimeout(function(){lightPad(color);},750);
}

//end lighting functions;

//human lighting functions
function padDown(id){
  if(turn == "human"){
  eval(id).style.background = lightColorMap[idcolMap[String(id)]];
  eval(soundMap[String(id)]).play();
  }
}

function padUp(divid){
  if(turn == "human"){
  eval(divid).style.background = regColors[idcolMap[String(divid)]];
  //eval(soundMap[String(divid)]).pause();
   checkStack(idcolMap[String(divid)]);
  }
 //put the function in here.
}

function updateDisplay(){
 if(seqCount < 10){ numbers.innerHTML = '0' + String(seqCount); }
 else{ numbers.innerHTML = String(seqCount);}
}

function simonTurn(){
 turn = 'simon';
 if(seqCount == 21){
   win();
 }
 if(!restart){
   sequence.unshift(selectBox());
   seqCount++;
 };
 updateDisplay();
 sequenceStack = JSON.parse(JSON.stringify(sequence));
 setTimeout(function(){populateBoard();},750);
}


function humanTurn(){
  turn = 'human';
  sequenceStack = JSON.parse(JSON.stringify(sequence));
  resetStack = JSON.parse(JSON.stringify(sequence));
}

//If the turn is for human, pad will be unlocked and then every input will use checkStack.
//This will continue until either the player gets all the way through, or the player is wrong.
function checkStack(input){
 if(sequenceStack.length != 0 && !(input == sequenceStack.pop())){
  lossSequence();
 }
 if(sequenceStack == 0){
  simonTurn();
 }
}

function lossSequence(){
 if(strict){
  startOver();
  sequence = [];
  sequenceStack = [];
 // seqCount = 0;
 // numbers.innerHTML = '00';
  updateDisplay();
  restart = false;
  
 }
 else{
 allRed();
 setTimeout(function(){allNorm()},750);
 sequence = JSON.parse(JSON.stringify(resetStack));
 secCount = sequence.length;
 updateDisplay();
 restart = true;
 //startGame();
  simonTurn();
 }
}

function allRed(){
  padArr.forEach(function(element){
   eval(element).style.background = 'red';
  });
}

function allNorm(){
  //Object.keys(idcolMap).forEach(function(elem){
   padArr.forEach(function(elem){
   eval(elem).style.background = regColors[idcolMap[String(elem)]];
  });
}

function win(){
  padArr.forEach(function(element){
   eval(element).style.background = 'red';
  });
   setTimeout(function(){allNorm();},500);
   padArr.forEach(function(element){
   eval(element).style.background = 'green';
  });
  setTimeout(function(){allNorm();},500);
   padArr.forEach(function(element){
   eval(element).style.background = 'blue';
  });
  setTimeout(function(){allNorm();},500);
   setTimeout(function(){allNorm();},500);
   padArr.forEach(function(element){
   eval(element).style.background = 'yellow';
  });
  startOver();
}
