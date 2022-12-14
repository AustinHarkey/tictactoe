const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

const p1 = Player('Player 1', 'x');
const p2 = Player('Player 2', 'o');


const game = (() => {
    let currentPlayer = p1;
    let text = document.querySelector('.main__player');
    text.textContent = 'Player 1 start';
    let squares = document.querySelectorAll('.board__tile');

    const playerMarksTile = (e) => {
        let pos = e.currentTarget.getAttribute('index');
        if(e.currentTarget.innerHTML === '' && currentPlayer === p1) {
            updateBoard('x', pos);
            e.currentTarget.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            text.textContent = 'Player 2 turn - O';
            currentPlayer = p2;
            gameCheck('x');
        } else if(e.currentTarget.innerHTML === '' && currentPlayer === p2) {
            updateBoard('o', pos);
            e.currentTarget.innerHTML = '<i class="oh fa-solid fa-o"></i>';
            text.textContent = 'Player 1 turn - X';
            currentPlayer = p1;
            gameCheck('o');
        }
    }

    const boardUi = () => {
        squares.forEach((square, idx) => {
            square.innerHTML = '';
            square.setAttribute('index', idx);
            square.addEventListener('click', playerMarksTile);     
            })
    }
    
    boardUi();

    const winningNumbers = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let board = [
        0,1,2,
        3,4,5,
        6,7,8
    ];
    const updateBoard = (mark, index) => {
        game.board[index] = mark;
        console.log(game.board);
    };


    const boardWin = () => {
        squares.forEach(square => {
            square.removeEventListener('click', playerMarksTile);
        })
    };

    let win = false;
    // check for for a winner
const gameCheck = (mark) => {
    let checkForWin = (mark) => {
        
        winningNumbers.forEach((arr) => {
            let check = [];
            for (let i = 0; i < 3; i++) {
                check.push(board[arr[i]]);
            }
            if (check[0] == mark && check[1] == mark && check[2] == mark) {
                win = true;
            }
            console.log(`check: ${check}`)
        });
        console.log(`win: ${win}`);
        return win;
      };
      
      // check if board is full of marks 
      let result = board.every((item) => {
        return typeof item === "string";
      });
      
      if (
        checkForWin("x") === false &&
        checkForWin("o") === false &&
        result === true
      ) {
        text.textContent = 'Tie Game';
      } else if (checkForWin("x") === true) {
        console.log("x wins");
        text.textContent = 'X Wins!';
        boardWin();
      } else if (checkForWin("o") === true) {
        console.log("o wins");
        text.textContent = 'O Wins!';
        boardWin();
      }
}


    let resetBtn = document.querySelector('.main__reset');
    resetBtn.addEventListener('click', () => {
        location.reload(); 
    });

    return {
        winningNumbers,
        board,
        updateBoard,
        gameCheck,
        boardUi
    }
})();








