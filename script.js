const boardElement = document.querySelectorAll('.field');

// factories for multiples of something  
const Player = (name, marker, icon) => {
    const placeMarker = position => {
        gameBoard.placeMarker(position, marker);
    };
   return { name, marker, icon, placeMarker };
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

    const showWon = (marker) => {
        for (let i = 0; i < 3; i++) {
            if (board[i] == marker && board[i + 3] == marker && 
                board[i + 6] == marker) {
                    displayController.displayWon([i, i + 3, i + 6]);
                }
        }
        for (let i = 0; i < 7; i = i + 3) {
            if (board[i] == marker && board[i + 1] == marker && 
                board[i + 2] == marker) {
                    displayController.displayWon([i, i + 1, i + 2]);
                }
        }
        if (board[0] == marker && board[4] == marker && board[8] == marker) {
            displayController.displayWon([0, 4, 8]);
        }
        if (board[2] == marker && board[4] == marker && board[6] == marker) {
            displayController.displayWon([2, 4, 6]);
        }
    }

    return {
        board,
        placeMarker,
        isBoardFull,
        isWon,
        showWon
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

    const displayWon = (indices) => {
        let index = 0;
        boardElement.forEach((field) => {
            if (indices.includes(index)) {
                field.classList.add("white");
            }
            index++;
        })
    }

    return {
        displayBoard,
        displayWon
    }
})();

const gameFlow = (() => {
    const prev = document.querySelectorAll(".prev");
    const next = document.querySelectorAll(".next");
    const play = document.getElementById("play");

    let highlight;
    let player1 = Player('Alex', 'X', 1);
    let player2 = Player('John', 'O', 1);

    let currentPlayer = player1;
    boardElement.forEach((field) => {
        field.addEventListener('click', selectUserField)  
    })

    let flag = true;

    function selectUserField(event) {
        if (event.composedPath()[0].innerText == '') { 
            currentPlayer.placeMarker(event.composedPath()[0].id - 1);
            if (gameBoard.isBoardFull() || gameBoard.isWon(currentPlayer.marker)) {
                if (gameBoard.isWon(currentPlayer.marker)) {
                    gameBoard.showWon(currentPlayer.marker);
                    setDescription(`${currentPlayer.name} wins!`);
                }
                else {
                    setDescription("It's a tie!");
                }
                
                flag = false;
                
                document.querySelector("#player2").classList.remove("highlight");
                document.querySelector("#player1").classList.remove("highlight");

                boardElement.forEach((field) => {
                    field.removeEventListener('click', selectUserField)  
                })
            }

            if (flag) {
                let highlightCurrentPlayer = currentPlayer == player1 ? `#player2` : `#player1`;
            highlight = document.querySelector(highlightCurrentPlayer);
            highlight.classList.add("highlight");

            currentPlayer = currentPlayer == player1 ? player2 : player1;
            setDescription(`${currentPlayer.marker}'s turn!`);

            highlightCurrentPlayer = currentPlayer == player1 ? `#player2` : `#player1`;
            highlight = document.querySelector(highlightCurrentPlayer);
            highlight.classList.remove("highlight");
            }   
        }
    }


    function setDescription(text) {
        let resultField = document.querySelector(".result");
        resultField.innerText = text;
    }

    prev.forEach((button) => {
        button.addEventListener('click', (e) => {
            let avatarImage = document.getElementById(e.composedPath()[1].classList[1]);
            let currentImage = +avatarImage.src.split('/').pop()[0]; 
            currentImage = currentImage == 1 ? 10: currentImage;
            avatarImage.src = `./assets/icons/${currentImage - 1}.svg`;
            if (e.composedPath()[1].classList[1] == '1') {
                player1.icon = currentImage - 1;
            }
            else {
                player2.icon = currentImage - 1;
            }
        })
    })

    next.forEach((button) => {
        button.addEventListener('click', (e) => {
            // to know which player
            let avatarImage = document.getElementById(e.composedPath()[1].classList[1]);
            let currentImage = +avatarImage.src.split('/').pop()[0];
            currentImage = currentImage == 9 ? 0: currentImage;
            avatarImage.src = `./assets/icons/${currentImage + 1}.svg`;

            if (e.composedPath()[1].classList[1] == '1') {
                player1.icon = currentImage + 1;
            }
            else {
                player2.icon = currentImage + 1;
            }
        })
    })

    if (play !== null) {
        play.addEventListener('click', (e) => {
            e.preventDefault();
            let name1 = document.getElementById('name-1').value;
            let name2 = document.getElementById('name-2').value;

            window.localStorage.setItem("name1", name1);
            window.localStorage.setItem("name2", name2);

            window.localStorage.setItem("icon1", player1.icon);
            window.localStorage.setItem("icon2", player2.icon);

            window.location.href = "./game.html";
        })
    }
 
    if (play === null) {
        document.querySelector(".refresh").addEventListener('click', (e) => {
            window.location.href = "./game.html";
        })
    
        document.querySelector(".home").addEventListener('click', (e) => {
            window.location.href = "./index.html";
        })

        player1.name = window.localStorage.getItem("name1");
        player2.name = window.localStorage.getItem("name2");

        player1.icon = window.localStorage.getItem("icon1");
        player2.icon = window.localStorage.getItem("icon2");

        let player1Region = document.querySelector("#player1");
        let player2Region = document.querySelector("#player2");

        player1Region.innerHTML = `<p>Mark: ${player1.marker}</p>
        <img src="./assets/icons/${player1.icon}.svg">
        <p class="name-label">${player1.name}</p>`;

        player2Region.innerHTML = `<p>Mark: ${player2.marker}</p>
        <img src="./assets/icons/${player2.icon}.svg">
        <p class="name-label">${player2.name}</p>`;
    }
})();

