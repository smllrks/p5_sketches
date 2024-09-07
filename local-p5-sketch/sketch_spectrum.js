let soundFile;
let fft;

function preload() {
  soundFile = loadSound('Testsong.mp3');
}

function setup() {
  createCanvas(800, 600);
  noFill();
  
  // Initialize FFT analyzer
  fft = new p5.FFT();
  fft.setInput(soundFile);
}

function draw() {
  background(0);
  
  // Analyze the frequency spectrum
  let spectrum = fft.analyze();
  
  // Draw the spectrum
  stroke(255, 0, 0);  // Red color for spectrum
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height/2 + map(spectrum[i], 0, 255, height/2, 0);
    line(x, height/2, x, height/2 + h);
  }
  
  // Get waveform data
  let waveform = fft.waveform();
  
  // Draw the waveform
  noFill();
  beginShape();
  stroke(0, 255, 0);  // Green color for waveform
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height/4, 3*height/4);
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {
    soundFile.play();
  }
}