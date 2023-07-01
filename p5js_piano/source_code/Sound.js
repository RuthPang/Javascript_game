let Scale = 0;
let letter = ['z','x','c','v','b','n','m','s','d','g','h','j'];
let one = [48, 50, 52, 53, 55, 57, 59, 49, 51, 54, 56, 58];
let two = [60, 62, 64, 65, 67, 69, 71, 61, 63, 66, 68, 70];
let three = [72, 74, 76, 77, 79, 81, 83, 73, 75, 78, 80, 82];
let four = [84];
//所有黑白鍵的midi number(先白後黑，根據儲存key obj 順序)
let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.3;
let releaseTime = 0.4;
let release = 0;
let noteIndex = 0, noteIndex_2 = 0;
let Music;

function startSound(){
  
  if(Music) {
    midiVal = midiNotes[noteIndex_2][noteIndex % midiNotes[noteIndex_2].length];
    noteIndex++;  
  }//播放default 曲子
  
  
  freq = midiToFreq(midiVal);
  osc.freq(freq);
  env.setRange(1.0, 0.0);
  
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  osc.start();
  env.triggerAttack(osc);
  release = 1;
  
  if(noteIndex == midiNotes[noteIndex_2].length*2){
    noteIndex = 0;
    noteIndex_2 ++;
  }
    
  if(noteIndex_2 == midiNotes.length){
    noteIndex = 0;
    noteIndex_2 = 0
  }
  
  
  
}//startSound end

function keyReleased(){  
  press = 0;
  release = 0;
  env.triggerRelease(osc);
}

function keyTyped(){
  
  if(key == 1 || key == 2 || key == 3 || key == 4){
    switch(key){
      case '1':
        Scale = one;
        break;
      case '2':
        Scale = two;
        break;
      case '3':
        Scale = three;
        break;
      case '4':
        Scale = four;
        break;
      default:
        console.log("error scale");
        
    }
    
  }
  else if(key == " ") { 
    Music = true;
    startSound();
  }
  else{
    midiVal = Scale[letter.indexOf(key)];
    Music = false;
    startSound();
  }
  
}//keyTyped end

