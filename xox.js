let playerText = document.getElementById('heading')
let restartBtn = document.getElementById('restartBtn')
let result = document.getElementById('result')
let boxes = Array.from(document.getElementsByClassName('btns'))

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)


const startGame = () => {
    boxes.forEach(btns => btns.addEventListener('click', btnClicked))
    document.getElementById("x").style.backgroundColor = "#FF2E63"
}

function btnClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(currentPlayer == "X"){
            document.getElementById("o").style.backgroundColor = "#FF2E63"
            document.getElementById("x").style.backgroundColor = "#071952"
        }
        else if(currentPlayer == "O"){
            document.getElementById("x").style.backgroundColor = "#FF2E63"
            document.getElementById("o").style.backgroundColor = "#071952"
        }
       
        if(playerHasWon()!==false){
            let winnig_bloocks = playerHasWon()

            winnig_bloocks.map(btns => boxes[btns].style.backgroundColor = "#08D9D6")
            result.style.display = "inline"
            result.innerHTML = currentPlayer + ' won!'
            restartBtn.innerHTML = 'Play again'
            boxes.forEach(btns => btns.disabled = true)
            return

        }
        else{
            let count = 0
            for (let index = 0; index < 9; index++) {
                if (spaces[index] != null) {
                    count++
                }   
            }

            if (count == 9) {
                result.style.display = "inline"
                restartBtn.style.display = "inline"
                result.innerHTML = 'Its a draw...'
            }
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningcombin = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningcombin) {
        let [a, b, c] = condition

        if(spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]){
            return [a, b, c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( btns => {
        btns.innerText = ' '
        btns.style.backgroundColor = "#35A29F"
        btns.disabled = false
        
    })
    document.getElementById("x").style.backgroundColor = "#FB2576"
    document.getElementById("o").style.backgroundColor = "#071952"
    result.innerHTML = ' '
    restartBtn.innerHTML = 'Restart'
    restartBtn.style.backgroundColor = "#FB2576"

    currentPlayer = X_TEXT 
}

startGame()