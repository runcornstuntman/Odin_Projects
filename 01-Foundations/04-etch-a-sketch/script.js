let ROWS = 30;
let COLUMNS = 30;
const CONTAINER_SIZE = 960;
let randomize = false;
let color = "black";

window.addEventListener('load', () => {
    initGrid(ROWS, COLUMNS);
});

function randomizeColor() {
    randomize = !randomize;
}

function setColorBlack() {
    color = "black";
    randomize = false;
}

function setColorWhite() {
    color = "white";
    randomize = false;
}

function createBox(boxSize) {
    let box = document.createElement("div");
    box.classList.add("box")
    box.style.width = `${boxSize}px`;
    box.style.height = `${boxSize}px`;
    box.addEventListener("mouseenter", () => {
        if (randomize){
            box.style.backgroundColor = generateRandomColor();
        } else{
            box.style.backgroundColor = color;
        }   
    });
    return box;
}

function resetGrid(){
    console.log("resetGrid");
    let grid = document.querySelector(".grid");
    grid.innerHTML = "";
    initGrid(ROWS, COLS);
}

function resizeGrid(){
    promptText = "Enter a new grid size between 16 to 100: ";
    let newSize = 0;
    while(true){
        newSize = prompt(promptText);
        if (newSize >= 16 && newSize <= 100){
            break;
        }
    }
    ROWS = newSize;
    COLS = newSize;
    resetGrid();
}

function generateRandomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

function initGrid(rows, cols){
    console.log("initGrid");
    let container = document.querySelector(".container");
    let grid = document.querySelector(".grid");
 
    let boxSize = Math.min(Math.floor(CONTAINER_SIZE / rows), Math.floor(CONTAINER_SIZE / cols));
    for(let r = 0; r < rows; r++){

        let row = document.createElement("div");
        row.classList.add("row")
        for(let c = 0; c < cols; c++){
            newBox = createBox(boxSize);
            row.appendChild(newBox);
        }
        grid.appendChild(row);
    }
    container.appendChild(grid);
}