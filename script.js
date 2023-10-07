/*
HOW THE GAME WILL PLAY OUT(NEEDS UPDATING):
-Board is layed out, indexes to rows and columns panned
-Player 1 is selected randomly


-Player 1 makes a move  
-Board is marked        X
-Player 2 makes a move
-Board is marked        XO

-After 5 turns, check if someone won, then check after every turn
-If no one won in 9 turns, it is concluded as a draw
*/

/*
WHICH ITEM BECOMES WHAT:
Game Board          |1| Module?
Placement Positions |9| Factory Function
Players             |2| Factory Function    CREATED

Total Wins          |8| Factory Function
Horizontal Wins     |3| Factory Function
Vertical Wins       |3| Factory Function
Cross Wins          |2| Factory Function


GAME BOARD FUNCTIONS

-Creating the board
-Marking the index
-switching the turn
-Check if index is already marked or not

*/


// FACTORY FUNCTION FOR MAKING PLAYERS: 2
// PLAYER 1
// PLAYER 2
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol
    };
};


/*
VERTICAL WINS: 3: Make array of size 3
- [0,0],[1,0],[2,0]='x'||'o' (player1.symbol)||(player2.symbol)
- [0,1],[1,1],[2,1]='x'||'o' (player1.symbol)||(player2.symbol)
- [0,2],[1,2],[2,2]='x'||'o' (player1.symbol)||(player2.symbol)

HORIZONTAL WINS: 3: Make array of size 3
- [0,0],[0,1],[0,2]='x'||'o' (player1.symbol)||(player2.symbol)
- [1,0],[1,1],[1,2]='x'||'o' (player1.symbol)||(player2.symbol)
- [2,0],[2,1],[2,2]='x'||'o' (player1.symbol)||(player2.symbol)

DIAGONAL WINS: 2: Make array of size 2
- [0,0],[1,1],[2,2]='x'||'o' (player1.symbol)||(player2.symbol)
- [0,2],[1,1],[2,0]='x'||'o' (player1.symbol)||(player2.symbol)

*/



const Rule = (onePlayerObject, anotherPlayerObject, testBoard) => {
    // currentPlayer = players[0].getName();
    // currentSymbol = players[0].getSymbol();
    currentPlayer = onePlayerObject.getName();
    currentSymbol = onePlayerObject.getSymbol();

    getCurrentPlayer = () => currentPlayer;
    getCurrentSymbol = () => currentSymbol;


    let verticalWins = [
        [
            [0, 0],
            [1, 0],
            [2, 0]
        ],

        [
            [0, 1],
            [1, 1],
            [2, 1]
        ],

        [
            [0, 2],
            [1, 2],
            [2, 2]
        ]
    ];
    let horizontalWins = [
        [
            [0, 0],
            [0, 1],
            [0, 2]
        ],

        [
            [1, 0],
            [1, 1],
            [1, 2]
        ],

        [
            [2, 0],
            [2, 1],
            [2, 2]
        ]
    ];
    // diagonalWins[winPattern][patternIndexNumber][patternIndexValue]
    let diagonalWins = [
        [
            [0, 0],
            [1, 1],
            [2, 2]
        ],

        [
            [0, 2],
            [1, 1],
            [2, 0]
        ]
    ];
    // wins[winType][winPattern][patternIndexNumber][patternIndexValue]
    let wins = [verticalWins, horizontalWins, diagonalWins];

    const currentTurn = () => {
        console.log("its currently " + getCurrentPlayer() + "'s turn");
    }

    const switchTurn = () => {
        if (currentPlayer === onePlayerObject.getName()) {
            console.log('TURNS SWITCHED to PLAYER 2');
            currentPlayer = anotherPlayerObject.getName();
            currentSymbol = anotherPlayerObject.getSymbol();
        }

        // BUG HERE DOESNT WORK
        else if (currentPlayer === anotherPlayerObject.getName()) {
            console.log('TURNS SWITCHED to PLAYER 1');

            currentPlayer = onePlayerObject.getName();
            currentSymbol = onePlayerObject.getSymbol();
        }
    }

    let winState = false;
    // CHECK FOR WIN AFTER 5 TURNS
    const checkForWin = () => {


        for (winType in wins) {
            let typeName = '';

            if (winType == 0)
                typeName = 'VERTICAL';
            else if (winType == 1)
                typeName = "HORIZONTAL";
            else if (winType == 2)
                typeName = "DIAGONAL";

            // console.log(typeName);


            for (i = 0; i < wins[winType].length; i++) {

                let matchCount = 0;
                for (j = 0; j < wins[winType][i].length; j++) {

                    if ((testBoard.getValueAt(wins[winType][i][j][0], wins[winType][i][j][1]) == currentSymbol)) {
                        matchCount++;
                        if (matchCount == 3) {
                            // console.log('----------WIN FOUND----------');
                            console.log(currentPlayer + ' WINS');
                            winState = true;
                            // return;
                            // return true;
                        } else if (winState == false && testBoard.getTurnCount() == 9) {
                            console.log('DRAW');
                            return;
                            // return false;
                        }

                    }
                    if (matchCount > 0) {
                        // console.log(typeName + ' MATCHING WIN POSITIONS OF PATTERN ' + i + ' ARE: ' + matchCount);
                    }


                }
            }
        }
    }
    const getWinState = () => winState;
    const resetWinState=()=>winState=false;
    return {
        currentTurn,
        getCurrentPlayer,
        getCurrentSymbol,
        switchTurn,
        checkForWin,
        getWinState,
        resetWinState
    };
}


const gameBoard = () => {

    let turnCount = 0;
    board = [];
    rows = 3;
    columns = 3;

    // CREATE BOARD
    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }


    // MARK BOARD
    const markBoard = (rows, columns) => {
        board[rows][columns] = getCurrentSymbol();
        turnCount++;
    }

    // EXPORT BOARD
    const getBoard = () => board;


    //  PRINT BOARD
    const printBoard = () => {
        console.table(board);
    }

    function getValueAt(row, column) {
        return board[row][column];
    }

    const getTurnCount = () => turnCount;

    const clearBoard = () => {
        for (i = 0; i < rows; i++) {
            board[i] = [];
            for (j = 0; j < columns; j++) {
                board[i].push(0);
            }
        }
        turnCount = 0;
    }

    return {
        getBoard,
        markBoard,
        printBoard,
        getTurnCount,
        getValueAt,
        clearBoard
    };
}

const Game = () => {



    p1 = Player('player1', 'x');
    p2 = Player('player2', 'o');

    let onePlayerScore = 0;
    let anotherPlayerScore = 0;

    const scores = () => [onePlayerScore, anotherPlayerScore];


    let testBoard = gameBoard(); //DEFINE THE BOARD
    let testRule = Rule(p1, p2, testBoard); //DEFINE THE RULES

    const playRound = (row, column) => {
        testBoard.printBoard();
        testRule.currentTurn();

        if (testBoard.getValueAt(row, column) != 0) {
            console.log('Space already marked! Try a different space.');
            testBoard.printBoard();
            testRule.currentTurn();

            return;
        }

        testBoard.markBoard(row, column);

        // THIS IS WHERE TO CHECK FOR WIN
        console.log('current turnCount: ' + testBoard.getTurnCount());
        testBoard.printBoard();

        if (testBoard.getTurnCount() >= 5) {
            testRule.checkForWin();
            if (testRule.getWinState() == true) {


                if (testRule.getCurrentSymbol() == 'x') {
                    onePlayerScore++;
                    // console.log('p1 score: '+onePlayerScore)
                    // INCREASE PLAYER 1 SCORE
                } else if (testRule.getCurrentSymbol() == 'o') {
                    anotherPlayerScore++;
                    // INCREASE PLAYER 2 SCORE
                }
                return;
            }
            if (testBoard.getTurnCount() == 9) {
                return;
            }
        }
        // if(testBoard.getTurnCount() == 9){
        //     return;
        // }
        testRule.switchTurn();
        testRule.currentTurn();

    }
    const resetGame = () => {
        // CALLS A CLEARBOARD FUNCTION FROM BOARD OBJECT
        testBoard.clearBoard();
        // RESET WINSTATE
        testRule.resetWinState();
        // RESET PLAYER SCORES
        onePlayerScore = 0;
        anotherPlayerScore = 0;
    }
    const playAgain = () => {
        // CALLS A CLEARBOARD FUNCTION FROM BOARD OBJECT
        testBoard.clearBoard();
        // RESET WINSTATE
        testRule.resetWinState();
    }
    return {
        playRound,
        resetGame,
        playAgain,
        scores,

        currentTurn: testRule.currentTurn, //might not need this
        getCurrentPlayer: testRule.getCurrentPlayer,
        getCurrentSymbol: testRule.getCurrentSymbol,
        getBoard: testBoard.getBoard,
    };

}

const displayScreen = () => {
    testGame = Game();


    const displayBoard = document.querySelector('.board');
    const displayTurn = document.querySelector('.turn');

    const board = testGame.getBoard();

    const currentPlayer = testGame.getCurrentPlayer();
    currentSymbol = testGame.getCurrentSymbol();


    const playerOneDiv = document.querySelector('.player-one-score');
    const playerTwoDiv = document.querySelector('.player-two-score');


    // playerOneDiv.textContent=testGame.scores[0];
    // playerTwoDiv.textContent=testGame.scores[1];



    // Lets just create our board first

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.classList.add('row-' + i);
            cell.classList.add('column-' + j);
            displayBoard.appendChild(cell);
        }
    }

    // WRITE ONTO THE BOARD WHEN THE PLAYER MARKS IT
    const writeBoard = (row, column) => {
        // const currentSymbol=testGame.getCurrentSymbol();
        const selectedCell = document.querySelector('.row-' + row + '.column-' + column);
        if (selectedCell.textContent == '') {
            selectedCell.classList.add('marked');
            selectedCell.textContent = currentSymbol;
        }
    }
    //print out row and column positioning for every button click
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // TARGETTING CELLS
            if (button.classList.contains('cell')) {
                console.log('CELL SELECTED');
                rowIndex = button.classList[1].substring(4, 5); //EXTRACT ROW INDEX NUMBER
                colIndex = button.classList[2].substring(7, 8); //EXTRACT COLUMN INDEX NUMBER


                
                writeBoard(rowIndex, colIndex);
                testGame.playRound(rowIndex, colIndex);
                // PLACE THE SCOREBOARD HERE
                playerOneDiv.textContent = testGame.scores()[0];
                playerTwoDiv.textContent = testGame.scores()[1];
                // console.log('p1 score '+testGame.scores[0]);
            } else if (button.classList.contains('reset')) {
                console.log('RESET GAME');
                testGame.resetGame();
                playerOneDiv.textContent = testGame.scores()[0];
                playerTwoDiv.textContent = testGame.scores()[1];

                allCells = document.querySelectorAll('.cell');
                allCells.forEach(cell => {
                    cell.textContent = '';
                })

            } else if (button.classList.contains('new')) {
                console.log('PLAY AGAIN');
                testGame.playAgain();
                allCells = document.querySelectorAll('.cell');
                allCells.forEach(cell => {
                    cell.textContent = '';
                })
            }
            // TARGETING RESET GAME
        })
    })
}
// GLOBAL SCOPE

displayScreen();