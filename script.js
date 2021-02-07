const wrapperDiv = document.querySelector('.grid');
let lastColor = 'black';


function setGridDims(dim) {
  wrapperDiv.setAttribute('style',`grid-template-columns:repeat(${dim},1fr); \
      grid-template-rows:repeat(${dim},1fr)`);
}


function createCells(boardSize) {
  deleteChildNodes(wrapperDiv);
  for (i=1; i<=boardSize**2; i++) {
      let cellDiv = document.createElement('div')
      cellDiv.className = 'cell';
      wrapperDiv.appendChild(cellDiv);
  }
  displayBoardSize(boardSize);
}


function deleteChildNodes(parent) {
while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
}
}


function displayBoardSize(boardSize) {
  let para = document.querySelector('.board-size');
  para.textContent = `${boardSize} x ${boardSize}`;
}


let slider = document.querySelector('.size-slider');
slider.addEventListener('change', () => {
    setGridDims(slider.value);
    createCells(slider.value);
    setBackgroundListener(lastColor);
    
})

const defaultColor = document.querySelector('#black');
defaultColor.addEventListener('click', () => {
    setBackgroundListener()
})


const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', clearBoard)

function clearBoard() {
  let cells = document.getElementsByClassName('cell');
  for (cell of cells) {
      cell.style.backgroundColor = 'white';
  }
} 


const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', () => {
    setBackgroundListener('rainbow');
}
)


const colorInput = document.querySelector('#input-color');
colorInput.addEventListener('change', () => {
    let color = colorInput.value;
    setBackgroundListener(color);
} 
)


const eraserBtn = document.querySelector('#eraser');
eraserBtn.addEventListener('click', () => {
  setBackgroundListener('white');
}
)


function setBackgroundListener(color='black') {
  let cells = wrapperDiv.children;
  lastColor = color

  if (color == 'rainbow') {
      for (cell of cells) {
      cell.addEventListener('mouseover', (cell) =>
          cell.target.style.backgroundColor=getRandomColor());
      } 
  } else {
      for (cell of cells) {
          cell.addEventListener('mouseover', (cell) =>
              cell.target.style.backgroundColor=color);
      }
      }
  }


function getRandomColor() {
  let randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  return randomColor;
}


function startGame() {
  let boardSize = 8;
  setGridDims(boardSize);
  createCells(boardSize);
  setBackgroundListener();
}


startGame();
