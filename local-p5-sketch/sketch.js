let soundFile;
let fft;

function preload() {
  soundFile = loadSound('Testsong.mp3');
}

function setup() {
  createCanvas(800, 600, WEBGL);
  noFill();
  strokeWeight(2);

  // Initialize FFT analyzer
  fft = new p5.FFT();
  fft.setInput(soundFile);
}

function draw() {
  background(0);

  // Analyze the frequency spectrum
  let spectrum = fft.analyze();

  // Get average energy for low, mid, and high frequencies
  let lowEnergy = fft.getEnergy("bass");
  let midEnergy = fft.getEnergy("mid");
  let highEnergy = fft.getEnergy("treble");

  // Draw cubes based on frequency energy
  drawCube(-200, 0, lowEnergy, color(0, 0, 255)); // Blue for bass
  drawCube(0, 0, midEnergy, color(255, 255, 0));  // Yellow for mid
  drawCube(200, 0, highEnergy, color(255, 0, 0)); // Red for treble
}

function drawCube(x, y, energy, col) {
  push();
  translate(x, y, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  let size = map(energy, 0, 255, 50, 200); // Map energy to cube size
  stroke(col);
  noFill();
  box(size);
  pop();
}

function mousePressed() {
  if (!soundFile.isPlaying()) {
    soundFile.play();
  }
}
