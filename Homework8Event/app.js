let origBoard;
const xPlayer = 'X';
const oPlayer = 'O';
const bValues = document.querySelectorAll('.boardItems');
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

function startGame() {
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < bValues.length; i++) {
        bValues[i].innerText = '';
        bValues[i].style.backgroundColor = 'white';
        bValues[i].addEventListener('click', turnClick, false);
        
    }
}

function turnClick(square) {
    if (square.target.innerText === '') {
        square.target.style = 'color: red;';
        turn(square.target.id, xPlayer);
        
    } else if (square.target.innerText === xPlayer || square.target.innerText === xPlayer) {
        square.target.style = 'color: black;';
        turn(square.target.id, oPlayer);
    } else if (square.target.innerText === oPlayer || square.target.innerText === oPlayer) {
        square.target.innerText = '';
    }
    
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon)  gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a,e,i) => 
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
         document.getElementById(index).style.backgroundColor =
         gameWon.player == 'X' ? '#74ee15' : '	#4deeea' ;
        
    }
    for (let i = 0; i < bValues.length; i++) {
        bValues[i].removeEventListener('click', turnClick, false); 
        
    }
    return gameWon.player == 'X' ? setTimeout(wonDealy.bind(gameWon.player), 100) : setTimeout(wonDealy.bind(gameWon.player), 100);
}

function wonDealy() {
    alert(`${this} Won!!!`);
    startGame();
}


