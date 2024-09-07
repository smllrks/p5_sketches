let soundFile;
let waveform;
let playbackPosition = 0;

function preload() {
  soundFile = loadSound('Testsong.mp3');
}

function setup() {
  createCanvas(800, 400);
  background(0);
  
  // Load the entire waveform
  waveform = soundFile.getPeaks(width);
}

function draw() {
  background(0);
  
  // Draw center line
  stroke(50);
  line(0, height/2, width, height/2);
  
  // Draw the entire waveform
  drawWaveform(100, width); // Light grey for full waveform
  
  // Calculate and draw the playback position
  if (soundFile.isPlaying()) {
    playbackPosition = map(soundFile.currentTime(), 0, soundFile.duration(), 0, width);
    
    // Draw a red line at the current position
    stroke(255, 0, 0);
    line(playbackPosition, 0, playbackPosition, height);
    
    // Draw the played portion of the waveform
    drawWaveform(color(0, 255, 0), playbackPosition); // Green for played portion
  }
  
  // Display play/pause status
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  text(soundFile.isPlaying() ? 'Playing' : 'Paused', 10, 10);
}

function drawWaveform(col, endX) {
  stroke(col);
  fill(col);
  beginShape();
  vertex(0, height/2);
  for (let i = 0; i < endX; i++) {
    let x = i;
    let y = map(abs(waveform[i]), 0, 1, height/2, height/4);
    vertex(x, y);
  }
  vertex(endX, height/2);
  endShape();
  
  beginShape();
  vertex(0, height/2);
  for (let i = 0; i < endX; i++) {
    let x = i;
    let y = map(abs(waveform[i]), 0, 1, height/2, 3*height/4);
    vertex(x, y);
  }
  vertex(endX, height/2);
  endShape();
}

function mousePressed() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {
    soundFile.play();
  }
}

function mouseDragged() {
  // Allow scrubbing through the song by clicking and dragging
  let newTime = map(mouseX, 0, width, 0, soundFile.duration());
  soundFile.jump(newTime);
}