function setup() {
    createCanvas(1400, 800, WEBGL); // Larger canvas width
    colorMode(HSB, 360, 100, 100); // Set color mode to HSB
  }
  
  function draw() {
    background(0);
  
    let hueValue = (frameCount % 360); // Cycle through hue values over time
  
    stroke('#000');
    
    // First box
    push();
    translate(-450, 0, 0); // Move the first box further to the left
    rotateX(frameCount / 50);
    rotateY(frameCount / 20);
    rotateZ(frameCount / 10);
    fill(hueValue, 100, 100);
    box(100, 100, 100); // Smallest box
    pop();
  
    // Second box
    push();
    translate(-150, 0, 0); // Move the second box to the left
    rotateX(frameCount / 50);
    rotateY(frameCount / 20);
    rotateZ(frameCount / 10);
    fill((hueValue + 90) % 360, 100, 100);
    box(150, 150, 150); // Slightly larger box
    pop();
  
    // Third box
    push();
    translate(150, 0, 0); // Move the third box to the right
    rotateX(frameCount / 50);
    rotateY(frameCount / 20);
    rotateZ(frameCount / 10);
    fill((hueValue + 180) % 360, 100, 100);
    box(200, 200, 200); // Larger box
    pop();
  
    // Fourth box
    push();
    translate(550, 0, 0); // Move the fourth box further to the right
    rotateX(frameCount / 50);
    rotateY(frameCount / 20);
    rotateZ(frameCount / 10);
    fill((hueValue + 270) % 360, 100, 100);
    box(250, 250, 250); // Largest box
    pop();
  }
  