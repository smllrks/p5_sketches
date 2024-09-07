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
  
  // Draw the entire waveform
  stroke(100);  // Light grey for the full waveform
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = i;
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
  
  // Calculate and draw the playback position
  if (soundFile.isPlaying()) {
    playbackPosition = map(soundFile.currentTime(), 0, soundFile.duration(), 0, width);
    
    // Draw a red line at the current position
    stroke(255, 0, 0);
    line(playbackPosition, 0, playbackPosition, height);
    
    // Draw the played portion of the waveform
    stroke(0, 255, 0);  // Green for the played portion
    beginShape();
    for (let i = 0; i < playbackPosition; i++) {
      let x = i;
      let y = map(waveform[i], -1, 1, height, 0);
      vertex(x, y);
    }
    endShape();
  }
  
  // Display play/pause status
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  text(soundFile.isPlaying() ? 'Playing' : 'Paused', 10, 10);
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