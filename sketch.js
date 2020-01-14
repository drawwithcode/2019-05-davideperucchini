var speech = new p5.Speech(voiceReady);
var capture;
var snapshots = [];
var counter = 0;
var button1;
var button2;
var button3;
var policeman;

function preload() {
  policeman = loadImage("./assets/policeman.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  speech.onResult = showResult();
  speech.start;
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  frameRate(60);
}

function showResult() {
  if (speech.resultValue == true) {
    console.log(speech.resultString)
  }
}

function voiceReady() {
  console.log(speech.voices);
}

// function mousePressed() {
//   // speech.listVoices();
//   speech.setVoice("Google UK English Male");
//   speech.speak("I'm the commissioner of the Internet Police");
// }

function draw() {

  var myImage = capture.loadPixels();
  imageMode(CENTER)
  image(myImage, width / 2, height / 2, 640, 480);

  background(color("#1e1e1e")); //I draw here the background to hide the webcam, so I don't spoil the prisoner

  //policeman
  button1 = createButton("RON STALLWORTH");
  button1.position(442, 600);
  button1.mousePressed(commissioner);


  //prisoner
  button2 = createButton("Who did you arrest?");
  button2.position(1050, 348);
  button2.mousePressed(takesnap);

  function takesnap() {
    var total = 3; //3 snapshots
    snapshots[counter] = capture.get();
    counter++;
    if (counter == total) {
      counter = 0;
    }
  }

  //shots dimensions
  var w = 300; //horizontal
  var h = 225; //vertical
  var x = windowWidth/2+200; //starting point
  var y = windowHeight / 2.4;

  push();
  for (var i = 0; i < snapshots.length; i++) {
    image(snapshots[i], x, y, w, h);
    x = x + w;
    if (x > windowWidth/2+200) {
      x = windowWidth/2+200;
      y = y + 125; //distance between the snapshots
    }
  }
  pop();

  function commissioner() {
    // speech.listVoices();
    speech.setVoice("Google UK English Male");
    speech.speak("I'm the commissioner of the Internet Police");
  }

  //policeman
  push();
  imageMode(CENTER);
  translate(500, windowHeight / 2);
  image(policeman, 0, 0, 260, 398);
  pop();

  push();
  fill('WHITE');
  textFont('Comic Sans MS');
  noStroke();
  textSize(60);
  textAlign(CENTER);
  text("🚓🚨👮🏽‍♂️ INTERNET POLICE 👮🏽‍♂️🚨🚓", windowWidth / 2, windowHeight / 8);
  pop();

}
