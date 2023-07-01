class Key {
  constructor(x, keywidth, keyheight) {
    this.x = x;
    this.keywidth = keywidth;
    this.keyheight = keyheight;
  }
}

class goingup {
  constructor(x, y, Width, Height, color){
    this.x = x;
    this.y = y;
    this.Width = Width;
    this.Height = Height;
    this.color = color;
  }
}

let octave = 3; //控制回傳幾個八度
let xstart = 100, ystart = 400, Wwidth=40, Wheight=100, Bwidth=35, Bheight=50, delta = 2; 
//琴鍵左上角位置及黑白鍵寬高長、鍵盤邊曲度
let keycolor = ["#3E000C", "#FB4B4E", "#FFCBDD", "#BE6B84", "#7C0B2B", "#D10000"];
//鍵盤按壓後的變色表
let press = 0, temp = -1, presskey;
let tmp=[];


function Drawkeys() {
  let num = 0;
  //先畫好白鍵
  for (let i = 0; i <= octave * 7; i++) {
    fill(255);
    stroke(0);
    rect(xstart + Wwidth * i, ystart, Wwidth, Wheight, delta);
    keys[num].x = xstart + Wwidth * i;
    keys[num].keywidth =  Wwidth;
    keys[num].keyheight = ystart + Bheight;
    num++;
  }
  //再畫好黑鍵
  let index = 0;
  for (let j = 0; j < octave; j++) {
    let m = xstart + 7 * 40 * j;
    for (let i = 0; i < 2; i++) {
      fill(0);
      stroke(255);
      strokeWeight(0.5);
      rect(m + 20 + 40 * i, ystart, Bwidth, Bheight, delta);
      keys[num].x = m + 20 + 40 * i;
      keys[num].keywidth =  Bwidth;
      keys[num].keyheight = ystart;
      num++;
      index ++;
      if (i == 1) n = m + 20 + 40 * 3;
    }
    for (let i = 0; i < 3; i++) {
      fill(0);
      stroke(255);
      strokeWeight(0.5);
      rect(n + 40 * i, ystart, Bwidth, Bheight, delta);
      keys[num].x = n + 40 * i;
      keys[num].keywidth =  Bwidth;
      keys[num].keyheight = ystart;
      num++;
      index ++;
    }
  }
  
  //飛上去
    for (let k = 0; k < tmp.length; k++){
      if(tmp[k].y-tmp[k].Height < 0){
          tmp.splice(k, 1);
          continue;
      }
        noStroke();
        fill(tmp[k].color);
        rect(tmp[k].x, tmp[k].y-tmp[k].Height, tmp[k].Width, tmp[k].Height, delta);
        tmp[k].y--;
      }
  

  
}//Drawkeys end

//按壓keyboard後變色
function change_color(){
  let height = 100, j=0;
  let i = one.indexOf(midiVal);
  if(i == -1){ i = two.indexOf(midiVal); j = 1; }
  if(i == -1){ i = three.indexOf(midiVal); j = 2; }
  if(i == -1){ i = four.indexOf(midiVal); j = 3; }
  if(i < 7) i = i+7*j;
  else i = 21+(i-6)+5*j;
  
  fill(keycolor[i % keycolor.length]); 
  if(keys[i].keyheight == ystart) height = 50;
  rect(keys[i].x, ystart, keys[i].keywidth, height, delta);
      
  //產生長條
  if(temp == i) press++;
  else press = 0;
  tmp.push(new goingup(keys[i].x, ystart, keys[i].keywidth, press, keycolor[i % keycolor.length]));
  noStroke();
  fill(keycolor[i % keycolor.length]);
  rect(keys[i].x, ystart-press, keys[i].keywidth, press, delta);
  temp = i;

  
}
