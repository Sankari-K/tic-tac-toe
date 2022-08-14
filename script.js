const boardElement = document.querySelectorAll('.field');

// factories for multiples of something  
const Player = (name, marker) => {
    const placeMarker = position => {
        gameBoard.placeMarker(position, marker);
    };
   return { name, marker, placeMarker };
};

// module for one of something
const gameBoard = (() => {
    let board = 
            [
            '', '', '',
            '', '', '',
            '', '', '',
            ]

    const placeMarker = (position, marker) => {
        if (board[position] === '') {
            board[position] = marker;
            console.log(board);
        }
        displayController.displayBoard(gameBoard.board);
    }

    const isBoardFull = () => {
        for (let i = 0; i < board.length; i++)
        {
            if (board[i] === '') {
                return false;
            }
        }
        return true;
    }

    const isWon = (marker) => {
        for (let i = 0; i < 3; i++) {
            if (board[i] == marker && board[i + 3] == marker && 
                board[i + 6] == marker) {
                    return true;
                }
        }
        for (let i = 0; i < 7; i = i + 3) {
            if (board[i] == marker && board[i + 1] == marker && 
                board[i + 2] == marker) {
                    return true;
                }
        }
        if (board[0] == marker && board[4] == marker && board[8] == marker) {
            return true;
        }
        if (board[2] == marker && board[4] == marker && board[6] == marker) {
            return true;
        }
        return false;
    }

    return {
        board,
        placeMarker,
        isBoardFull,
        isWon
    };
})();

const displayController = (() => {
    const displayBoard = (gameBoard) => {
        let index = 0;
        boardElement.forEach((field) => {
            field.innerText = gameBoard[index];
            index++;
        })
    }
    return {
        displayBoard
    }
})();

const gameFlow = (() => {
    const prev = document.querySelectorAll(".prev");
    const next = document.querySelectorAll(".next");

    let player1 = Player('Alex', 'X');
    let player2 = Player('John', 'O');
    let currentPlayer = player2;
    boardElement.forEach((field) => {
        field.addEventListener('click', selectUserField)  
    })

    function selectUserField(event) {
        if (event.composedPath()[0].innerText == '') {
            currentPlayer.placeMarker(event.composedPath()[0].id - 1);
            if (gameBoard.isBoardFull() || gameBoard.isWon(currentPlayer.marker)) {
                console.log(gameBoard.isBoardFull());
                console.log(gameBoard.isWon(currentPlayer.marker));
                console.log("game over!");
                boardElement.forEach((field) => {
                    field.removeEventListener('click', selectUserField)  
                })
            }
            currentPlayer = currentPlayer == player1 ? player2 : player1;
        }
    }

    prev.forEach((button) => {
        button.addEventListener('click', (e) => {
            let avatarImage = document.getElementById(e.composedPath()[1].classList[1]);
            let currentImage = +avatarImage.src.split('/').pop()[0];
            currentImage = currentImage === 1 ? 10: currentImage;
            avatarImage.src = `./assets/icons/${currentImage - 1}.svg`;
        })
    })

    next.forEach((button) => {
        button.addEventListener('click', (e) => {
            let avatarImage = document.getElementById(e.composedPath()[1].classList[1]);
            let currentImage = +avatarImage.src.split('/').pop()[0];
            currentImage = currentImage === 9 ? 0: currentImage;
            avatarImage.src = `./assets/icons/${currentImage + 1}.svg`;
        })
    })
    // const control = () => {
    //     displayController.displayBoard(gameBoard.board);
    // }
    // return {
    //     control
    // }
})();

// gameFlow.control();
