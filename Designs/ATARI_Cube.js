function setup() {
  createCanvas(800, 600, WEBGL);
  strokeWeight(2);
}

function draw() {
  background(0);

  // Set a fixed size for the cube
  let size = 200;

  // Draw a rotating 3D cube
  stroke(255); // Monochrome white
  noFill();
  push();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(size);
  pop();

  // Draw a grid of lines to simulate depth
  let gridSize = 20;
  for (let x = -width / 2; x < width / 2; x += gridSize) {
    for (let y = -height / 2; y < height / 2; y += gridSize) {
      line(x, y, 0, x, y, -200);
    }
  }

  // Draw a simple border
  stroke(255);
  noFill();
  rectMode(CENTER);
  rect(0, 0, width - 20, height - 20);
}
