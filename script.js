const sketchOutline = document.querySelector('#sketch-outline');
const squareContainer = document.querySelector('#sketch-container');
let gridSize = 64;

const gridSelect = document.querySelector('#gridSelect');
const gridValueLabel = document.querySelector('#gridValue');
const clearButton = document.querySelector('#clearBtn')

const leftHandle = document.querySelector('#left-surface');
const rightHandle = document.querySelector('#right-surface');

let rotationX = 0;
let rotationY = 0;

function createGrid(gridSize){

    squareContainer.innerHTML = "";
    squareContainer.style.setProperty("--grid-size", gridSize);
    for (let i = 0; i < gridSize * gridSize; i++){
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareContainer.append(squareDiv);
    }
}

squareContainer.addEventListener('mouseover', (e) =>{
    if(e.target.classList.contains('square')){
        e.target.style.backgroundColor = "grey";
    }})

squareContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
createGrid(gridSize)


gridSelect.oninput = function(){
    gridValueLabel.textContent = this.value;
    createGrid(this.value)
}


clearButton.addEventListener('click', ()=> {
    sketchOutline.classList.remove('swing');
    void sketchOutline.offsetWidth;
    sketchOutline.classList.add('swing');
    const squares = document.querySelectorAll('.square');
    squares.forEach(sq => sq.classList.add('fadeOut'));
    setTimeout(() => {
        squareContainer.innerHTML = "";
        rotationX = 0;
        rotationY = 0;
        leftHandle.style.transform = `rotate(0deg)`;
        rightHandle.style.transform = `rotate(0deg)`;
        createGrid(gridSelect.value);}, 1000);
    ;
    
})

squareContainer.addEventListener('mousemove', (e) => {
    if (e.target.classList.contains('square')) {
        rotationX += e.movementX * 1.5;
        rotationY += e.movementY * 1.5;
        let stepRotationX = Math.round(rotationX / 5) * 5;
        let stepRotationY = Math.round(rotationY / 5) * 5;
    
    leftHandle.style.transform = `rotate(${stepRotationX}deg)`;
    rightHandle.style.transform = `rotate(${stepRotationY}deg)`;
    }
})