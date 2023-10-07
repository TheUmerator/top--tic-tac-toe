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

    function fillReferenceBoard(anyWins) {
        for (i = 0; i < anyWins.length; i++) {

            console.log('INDEX ' + i);
            for (j = 0; j < anyWins[i].length; j++) {
                // console.log(verticalWins[i][j]);
                referenceBoard.markBoard(anyWins[i][j][0], anyWins[i][j][1]);
                referenceBoard.printBoard();
            }
            console.log('END OF ONE WIN CONDITION');
            // THIS IS WHERE YOU CHECK IF EITHER WIN CONDITION OF YOUR TEST BOARD IS 
            // EQUAL TO EITHER OF YOUR REFERENCE BOARD VALUES

        }
        // return anyWins;
    }

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

            console.log(typeName);


            for (i = 0; i < wins[winType].length; i++) {

                let matchCount = 0;
                for (j = 0; j < wins[winType][i].length; j++) {

                    if ((testBoard.getValueAt(wins[winType][i][j][0], wins[winType][i][j][1]) == currentSymbol)) {
                        matchCount++;
                    }
                    if (matchCount > 0) {
                        console.log(typeName + ' MATCHING WIN POSITIONS OF PATTERN ' + i + ' ARE: ' + matchCount);
                    }
                    if (matchCount == 3) {
                        // console.log('----------WIN FOUND----------');
                        console.log(currentPlayer + ' WINS');
                        return;
                    }
                }
            }
        }

    }

    return {
        currentTurn,
        getCurrentPlayer,
        getCurrentSymbol,
        switchTurn,
        checkForWin
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
    return {
        getBoard,
        markBoard,
        printBoard,
        getTurnCount,
        getValueAt
    };
}

const Game = () => {
    // let players = []; //NOT DEFINED IN RULE AND GAME

    p1 = Player('player1', 'x');
    p2 = Player('player2', 'o');

    // players.push(p1, p2);

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

        if (testBoard.getTurnCount() == 5) {
            testRule.checkForWin();
            return;
        }

        testRule.switchTurn();
    }
    return {
        playRound,
        currentTurn: testRule.currentTurn, //might not need this
        getCurrentPlayer: testRule.getCurrentPlayer,
        getBoard: testBoard.getBoard

    };

}

const displayScreen = () => {
    testGame = Game();

    // testGame.playRound(0, 0);
    // testGame.playRound(1, 0);
    // // testGame.playRound(0,1);
    // // testGame.playRound(1,1);
    // // testGame.playRound(0,2);
    // testGame.playRound(1, 0);

    const displayBoard = document.querySelector('.board');
    const displayTurn = document.querySelector('.turn');
    const board = testGame.getBoard();
    const currentPlayer = testGame.getCurrentPlayer();

    // Lets just create our board first

    for (i=0;i<3;i++) {
        for (j=0;j<3;j++) {
            const cell=document.createElement('button');
            cell.classList.add('cell');
            cell.classList.add('row-'+i);
            cell.classList.add('column-'+j);
            displayBoard.appendChild(cell);
        }
    }

    // 
}
// GLOBAL SCOPE

displayScreen();