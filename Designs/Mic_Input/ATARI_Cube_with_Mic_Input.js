let amplitude;

function setup() {
  createCanvas(800, 600);
  noFill();
  strokeWeight(2);

  // Create an audio input and start it
  let mic = new p5.AudioIn();
  mic.start();

  // Create an amplitude analyzer
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
}

function draw() {
  background(0);

  // Get the current amplitude level
  let level = amplitude.getLevel();

  // Increase sensitivity by mapping to a larger range
  let size = map(level, 0, 0.1, 0, 600);

  // Draw concentric circles
  stroke(255, 100, 150);
  ellipse(width / 2, height / 2, size, size);

  // Draw rotating lines
  stroke(150, 255, 100);
  let angleStep = TWO_PI / 10;
  for (let angle = 0; angle < TWO_PI; angle += angleStep) {
    let x = width / 2 + cos(angle) * size;
    let y = height / 2 + sin(angle) * size;
    line(width / 2, height / 2, x, y);
  }

  // Draw a bouncing rectangle
  stroke(100, 150, 255);
  let rectSize = size / 2;
  rectMode(CENTER);
  rect(width / 2, height / 2, rectSize, rectSize);
}
