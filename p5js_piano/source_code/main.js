let midiVal, freq;
let keys=[];//存取所有鍵的array
let music; //按白鍵時發出的樂曲聲
let button, img;
let show;

function preload(){
  music = loadJSON("music.json");
  img = loadImage("text.png");
}

function setup() {  
  button = createButton('Note');
  button.position(750,5);
  button.size(80,40);
  button.style("font-size", "24px");
  button.mousePressed(showText);
  show = false;
  
  midiNotes = music.notes;
  createCanvas(1500, 500);
  osc = new p5.TriOsc();
  env = new p5.Envelope();
  
  for (let i = 0; i < octave*12+1; i++){
    keys[i] = new Key(0, 0, 0);
  }
  
}

function draw() {
  background('#281d02');
  Drawkeys();
  if(release) change_color();
  
  textSize(18);
  text('使用方法:程式執行後，以滑鼠點鋼琴畫面任意處，再按壓數字鍵(1,2,3,4)，開始以鍵盤彈奏', 10, 20);
  if (midiVal) {
    text('MIDI: ' + midiVal, 10, 40);
    text('Freq: ' + freq, 10, 60);

  }
  
  if(show) {
    image(img, 850, 5, 400, 200);
  }
  
}//draw end

function showText(){
   show = ~show;
}



