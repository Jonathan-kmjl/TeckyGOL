let unitLength = 20;
let boxColor = 150;
let strokeColor = 50;
let rectX = 0;
let fr = 5; //starting FPS
let clr;
let stopRightNow = false;
let backgroundValue=255;

let neighborsDie = 2;
let variableASpan = document.getElementById("variableA");
variableASpan.textContent =neighborsDie;

let neighborOverpopulation = 3;
let variableBSpan = document.getElementById("variableB");
variableBSpan.textContent =neighborOverpopulation;

let neighborReproduction = 3;
let variableCSpan = document.getElementById("variableC");
variableCSpan.textContent =neighborReproduction;

let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;

document.querySelector("#colorChangeGridLineColor").addEventListener("click", function () {
  strokeColor = color(random(255), random(255), random(255));
});

document.querySelector("#reverseColorChangeGridLineColor").addEventListener("click", function () {
  strokeColor = color(50,50,50);
});

document.querySelector("#colorChangeCell").addEventListener("click", function () {

  boxColor= color(random(255), random(255), random(255));
  
});

document.querySelector("#colorChangeBackgroundColor").addEventListener("click", function () {
  backgroundValue= color(1,1,1)
  
});
document.querySelector("#reverseColorChangeBackgroundColor").addEventListener("click", function () {
  backgroundValue= color(255,255,255)
 
});

let slider = document.querySelector("#speed");
fr = parseInt(slider.value);

slider.addEventListener("input", function() {
  fr = parseInt(slider.value);
  frameRate(fr);
});

function setup() {
  /* Set frame rate*/
  background(200);
  frameRate(fr); // Attempt to refresh at starting FPS
  clr = color(255, 0, 0);

  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas((windowWidth)*0.7, (windowHeight - 100)*0.7);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height/ unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}


  
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
    }
  }
}

document.querySelector("#Random-game").addEventListener("click", function () {
 
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = random() > 0.8 ? 1 : 0; // one line if
      nextBoard[i][j] = 0;
    }
  }
  
  
});

function draw() {
  background(backgroundValue);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] == 1) {
        
        fill(boxColor);
      } else {
        fill(backgroundValue);
      }
      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}

function generate() {
  //Loop over every single box on the board
  if ((stopRightNow == false)) {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        // Count all living members in the Moore neighborhood(8 boxes surrounding)
        let neighbors = 0;
        for (let i of [-1, 0, 1]) {
          for (let j of [-1, 0, 1]) {
            if (i == 0 && j == 0) {
              // the cell itself is not its own neighbor
              boxColor= color(random(255), random(255), random(255));
              continue;
            }
            // The modulo operator is crucial for wrapping on the edge
            neighbors +=
              currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
          }
        }

        // Rules of Life
        if (currentBoard[x][y] == 1 && neighbors < neighborsDie) {
          // Die of Loneliness
          nextBoard[x][y] = 0;
        } else if (
          currentBoard[x][y] == 1 &&
          neighbors > neighborOverpopulation
        ) {
          // Die of Overpopulation
          nextBoard[x][y] = 0;
        } else if (
          currentBoard[x][y] == 0 &&
          neighbors == neighborReproduction
        ) {
          // New life due to Reproduction
          nextBoard[x][y] = 1;
        } else {
          // Stasis
          nextBoard[x][y] = currentBoard[x][y];
        }
      }
    }
  
  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
  }
}
/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
 
  currentBoard[x][y] = 1;
  fill(boxColor);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  noLoop();

  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
  loop();
}
document.querySelector("#reset-game").addEventListener("click", function () {
  backgroundValue=255
  init();

 });



function parseInput() {
  // Get the input value from the textbox
  let input = document.querySelector("#numberInput").value;

  // Parse the input as an integer
  neighborsDie = parseInt(input);
  let variableASpan = document.getElementById("variableA");
  variableASpan.textContent =neighborsDie;
}
function parseInput2() {
  // Get the input value from the textbox
  let input = document.querySelector("#numberInput2").value;

  // Parse the input as an integer
  neighborOverpopulation = parseInt(input);
  let variableBSpan = document.getElementById("variableB");
  variableBSpan.textContent =neighborOverpopulation;

}function parseInput3() {
  // Get the input value from the textbox
  let input = document.querySelector("#numberInput3").value;

  // Parse the input as an integer
  neighborReproduction = parseInt(input);
  let variableCSpan = document.getElementById("variableC");
  variableCSpan.textContent =neighborReproduction;
}

document.querySelector(".btn-start").addEventListener("click", (event) => {
  stopRightNow = false
});

document.querySelector(".btn-stop").addEventListener("click", (event) => {
  console.log("test")
  stopRightNow = true
});

console.log("testing")
console.log("Slider value:", fr);

