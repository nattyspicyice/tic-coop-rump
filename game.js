let playerText = document.getElementById("winningMessageText")
let resetBtn = document.getElementById('reset-btn')
let tiles = Array.from(document.getElementsByClassName('tile'))

const COOP = "COOP"
const RUMP = "RUMP"
let currentPlayer = COOP
let spaces = Array(9).fill(null)

const startGame = () => {
    tiles.forEach(tile => tile.addEventListener('click', tileClicked))
}

function tileClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
        }

        currentPlayer = currentPlayer == COOP ? RUMP : COOP
    }
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombinations) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c]
        }
    }
    return false;
}

resetBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    tiles.forEach(tile => {
        tile.innerText = ''
    })

    playerText.innerHTML = ''
    currentPlayer = COOP
}

startGame();