const gameBoard = (() => {
    let board = [];
    let whoseTurn = 'X';
    const initialize = () => board = [null, null, null, null, null, null, null, null, null];
    const addMark = (index, mark) => board.splice(index, 1, mark);
    const nextTurn = () => whoseTurn === 'X' ? whoseTurn = 'O' : whoseTurn = 'X';
    const getTurn = () => {return whoseTurn};
    const getBoard = () => {return board};
    return {
        initialize,
        addMark,
        nextTurn,
        getTurn,
        getBoard
    };
})();

const displayController = (() => {
    const grid = document.querySelector('.grid').children;
    const initialize = () => {
        for (const square of grid) {
            square.addEventListener('click', handleClick);
        };
        gameBoard.initialize();
    };

    const handleClick = (e) => {
        if(e.target.innerText === ""){
            gameBoard.addMark(e.target.dataset.index, gameBoard.getTurn());
            gameBoard.nextTurn();
            displayController.update();
        }   
    };

    const update = () => {
        const board = [...gameBoard.getBoard()];
        board.forEach((square, index) => {
            grid[index].innerText = square;
        });
    };
    return {
        initialize,
        update
    };
})();

displayController.initialize();