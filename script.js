// factories for multiples of something  
const Player = (name, marker) => {
    const placeMarker = position => {
        gameBoard.placeMarker(position, marker);
    };
   return { name, marker };
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
        }
    }

    const isBoardFull = () => {
        for (let i = 0; i < board.length - 1; i++)
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
        console.log("Update board");
    }
    return {
        displayBoard
    }
})();

const gameFlow = (() => {
    let player1 = Player('Alex', 'X');
    let player2 = Player('John', 'O');
    let currentPlayer = player2;
    while (!gameBoard.isBoardFull() && !gameBoard.isWon(currentPlayer.marker)) {
        // !gameBoard.isWon() && 
        currentPlayer = currentPlayer == player1 ? player2 : player1;
        currentPlayer.placeMarker(3);
        
    }
})();
// gameBoard.placeMarker(5, 'X');