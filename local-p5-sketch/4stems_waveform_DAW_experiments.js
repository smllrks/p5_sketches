let stems = [];
let waveforms = [];
let playbackPosition = 0;
const numStems = 4;
const waveformColors = [
  [142, 202, 230],  // Soft Blue
  [255, 183, 178],  // Soft Red
  [195, 233, 187],  // Soft Green
  [251, 231, 198]   // Soft Yellow
];

// Song information
const songName = "Last Note";
const bpm = 103;
const key = "D Major";
const socials = "@FourStems";

function preload() {
  for (let i = 0; i < numStems; i++) {
    stems.push(loadSound(`stem${i+1}.mp3`));
  }
}

function setup() {
  createCanvas(800, 650);  // Increased height for header
  background(0);
  
  // Load the entire waveform for each stem
  for (let i = 0; i < numStems; i++) {
    waveforms.push(stems[i].getPeaks(width));
  }
}

function draw() {
  background(0);
  
  // Draw header
  drawHeader();
  
  // Calculate the height for each waveform
  let waveformHeight = (height - 50) / numStems;  // Subtract header height
  
  for (let i = 0; i < numStems; i++) {
    // Draw center line for each waveform
    stroke(50);
    let centerY = 50 + i * waveformHeight + waveformHeight / 2;  // Offset for header
    line(0, centerY, width, centerY);
    
    // Draw the entire waveform
    drawWaveform(color(waveformColors[i][0], waveformColors[i][1], waveformColors[i][2], 100), width, i, waveformHeight);
    
    // Calculate and draw the playback position
    if (stems[i].isPlaying()) {
      playbackPosition = map(stems[i].currentTime(), 0, stems[i].duration(), 0, width);
      
      // Draw a white line at the current position
      stroke(255);
      line(playbackPosition, 50 + i * waveformHeight, playbackPosition, 50 + (i + 1) * waveformHeight);
      
      // Draw the played portion of the waveform
      drawWaveform(color(waveformColors[i]), playbackPosition, i, waveformHeight);
    }
  }
}

function drawHeader() {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text(songName, width/2, 25);
  
  textAlign(LEFT, CENTER);
  textSize(16);
  text(`${key}`, 10, 25);
  text(`${bpm} bpm`, 10, 45);
  
  textAlign(RIGHT, CENTER);
  text(socials, width - 10, 25);
}

function drawWaveform(col, endX, stemIndex, waveformHeight) {
  let centerY = 50 + stemIndex * waveformHeight + waveformHeight / 2;  // Offset for header
  
  stroke(col);
  fill(col);
  beginShape();
  vertex(0, centerY);
  for (let i = 0; i < endX; i++) {
    let x = i;
    let y = map(abs(waveforms[stemIndex][i]), 0, 1, centerY, centerY - waveformHeight/1);
    vertex(x, y);
  }
  vertex(endX, centerY);
  endShape();
  
  beginShape();
  vertex(0, centerY);
  for (let i = 0; i < endX; i++) {
    let x = i;
    let y = map(abs(waveforms[stemIndex][i]), 0, 1, centerY, centerY + waveformHeight/1);
    vertex(x, y);
  }
  vertex(endX, centerY);
  endShape();
}

function mousePressed() {
  for (let stem of stems) {
    if (stem.isPlaying()) {
      stem.pause();
    } else {
      stem.play();
    }
  }
}

function mouseDragged() {
  // Allow scrubbing through the songs by clicking and dragging
  let newTime = map(mouseX, 0, width, 0, stems[0].duration());
  for (let stem of stems) {
    stem.jump(newTime);
  }
}