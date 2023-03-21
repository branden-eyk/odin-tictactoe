// Module for initializing, determining a winnder, and otherwise keeping track of all things related to the Tic Tac Toe game board
const gameBoard = (() => {
    let board = [];
    let whoseTurn = 'X';
    let player1 = {};
    let player2 = {};
    let message = '';

    const initialize = (player1Name, player2Name) => {
        board = [null, null, null, null, null, null, null, null, null];
        message = '';
        player1 = playerFactory(player1Name);
        player2 = playerFactory(player2Name);
    };

    const declareWinner = (winner) => {
        displayController.disableUI();

        switch (winner) {
            case 'X':
                message = `${player1.name} Wins`;
                break;
            case 'O':
                message = `${player2.name} Wins`;
                break;
            case 'Draw':
                message = 'Draw';
                break;
            default:
                break;
        };
    };

    const checkGame = (index) => {
        const filledSquares = board.filter(square => square != null).length;

        if (checkRow(index)){
            declareWinner(board[index]);
        } else if(checkCol(index)){
            declareWinner(board[index]);
        } else if (checkDiag(index)){
            declareWinner(board[index]);
        } else if (filledSquares === 9){
            declareWinner('Draw');
        };

        function checkRow(index){
            if(index === 0 || index === 1 || index === 2){
                if (board[0] === board[1] && board[1] === board[2]){
                    return true;
                } else {
                    return false;
                };
            } else if(index === 3 || index === 4 || index === 5) {
                if (board[3] === board[4] && board[4] === board[5]){
                    return true;
                } else {
                    return false;
                };
            } else if(index === 6 || index === 7 || index === 8){
                if (board[6] === board[7] && board[7] === board[8]){
                    return true;
                } else {
                    return false;
                };
            };
        };

        function checkCol(index){
            if(index === 0 || index === 3 || index === 6 ){
                if (board[0] === board[3] && board[3] === board[6]){
                    return true;
                } else {
                    return false;
                };
            } else if(index === 1 || index === 4 || index === 7){
                if (board[1] === board[4] && board[4] === board[7]){
                    return true;
                } else {
                    return false;
                }
            } else if (index === 2 || index === 5 || index === 8){
                if (board[2] === board[5] && board[5] === board[8]){
                    return true;
                } else {
                    return false;
                }
            };
        };

        function checkDiag(index){
            if(index === 0 || index === 8){
                if (board[0] === board[4] && board[4] === board[8]){
                    return true;
                } else {
                    return false;
                };
            } else if (index === 2 || index === 6){
                if (board[2] === board[4] && board[4] === board[6]){
                    return true;
                } else {
                    return false;
                };
            } else if (index === 4){
                if ((board[4] === board[0] && board[4] === board[8]) || (board[4] === board[2] && board[4] === board[6])){
                    return true;
                } else {
                    return false;
                };
            };
        };
    };

    const addMark = (index, mark) => board.splice(index, 1, mark);
    const nextTurn = () => whoseTurn === 'X' ? whoseTurn = 'O' : whoseTurn = 'X';
    const getTurn = () => {return whoseTurn};
    const getBoard = () => {return board};
    const getMessage = () => {return message};

    return {
        initialize,
        checkGame,
        addMark,
        nextTurn,
        getTurn,
        getBoard,
        getMessage
    };
})();

// Module containing all the processes involved in displaying the game progress on the webpage
const displayController = (() => {
    const grid = document.querySelector('.grid').children;
    const messageDisplay = document.querySelector('.message__text');

    const initialize = () => {
        for (const square of grid) {
            square.addEventListener('click', handleClick);
        };
        messageDisplay.innerText = gameBoard.getMessage();
        update();
    };

    const handleClick = (e) => {
        if(e.target.innerText === ""){
            gameBoard.addMark(e.target.dataset.index, gameBoard.getTurn());
            gameBoard.nextTurn();
            gameBoard.checkGame(parseInt(e.target.dataset.index));
            displayController.update();
        }
    };

    const update = () => {
        const board = [...gameBoard.getBoard()];
        board.forEach((square, index) => {
            grid[index].innerText = square;
        });
        messageDisplay.innerText = gameBoard.getMessage();
    };

    const disableUI = () => {
        for (const square of grid) {
            square.removeEventListener('click', handleClick);
        };
    }

    return {
        initialize,
        update,
        disableUI
    };
})();

// Module containing all the processes involved in displaying and hiding the new game settings modal
const modalController = (() => {
    const modal = document.querySelector('.modal');
    const newGame = document.querySelector('.footer__button');
    const startGame = document.querySelector('.modal__button');

    const toggleModal = () => {
        modal.classList.toggle('hidden');
    };

    const initialize = () => {
        newGame.addEventListener('click', toggleModal);
        modal.addEventListener('click', (e) => {
            if(e.target === modal){
                toggleModal();
            };
        });
        startGame.addEventListener('click', (e) => {
            e.preventDefault();
            const player1 = document.querySelector('#playerOneName');
            const player2 = document.querySelector('#playerTwoName');
            gameBoard.initialize(player1.value, player2.value);
            displayController.initialize();
            console.log('clicked');
            toggleModal();
        });
    };

    return{
        toggleModal,
        initialize
    };

})();

// Factory function for generating player objects
const playerFactory = (name) => {
    // determineMove function doesn't do anything at this time. It was intended to be inherited by a CPU object that WOULD use it to do something.
    // I decided to move on with The Odin Project rather than take the time to code out the logic for a CPU Player
    // I'm leaving it in as I might return to finish this some day
    const determineMove = () => {return false};
    return {name, determineMove}; 
};

// function calls on page load to immediately show user the controls for starting a game

modalController.initialize();
modalController.toggleModal();