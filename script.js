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


// FACTORY FUNCTION FOR MAKING RULES:
// CURRENT PLAYER
// SWITCH TURNS
// 

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






const Rule = () => {

    let referenceBoard = gameBoard();


    currentPlayer = players[0].getName();
    currentSymbol = players[0].getSymbol();

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
        if (currentPlayer === players[0].getName()) {
            console.log('TURNS SWITCHED to PLAYER 2');
            currentPlayer = players[1].getName();
            currentSymbol = players[1].getSymbol();
        }

        // BUG HERE DOESNT WORK
        else if (currentPlayer === players[1].getName()) {
            console.log('TURNS SWITCHED to PLAYER 1');

            currentPlayer = players[0].getName();
            currentSymbol = players[0].getSymbol();
        }
    }


    // CHECK FOR WIN AFTER 5 TURNS
    const checkForWin = () => {

        referenceBoard.printBoard();

        // {
        //     referenceBoard.markBoard(,);
        // }
        // console.log(verticalWins[0].length)
        // console.log(verticalWins[0][0].length)

        fillReferenceBoard(verticalWins);
        // for(i=0;i<verticalWins.length;i++)
        // {
        //     console.log('INDEX '+i);
        //     for(j=0;j<verticalWins[i].length;j++)
        //     {
        //         // console.log(verticalWins[i][j]);
        //         referenceBoard.markBoard(verticalWins[i][j][0],verticalWins[i][j][1]);
        //         referenceBoard.printBoard();
        //     }
        // }



        // console.log(verticalWins[1][0][0])
        // console.log(verticalWins[0][0]);
        // console.log(testBoard.getBoard()[verticalWins[0][0]]);
        // console.log(verticalWins[0]);
        // if (testBoard.getTurnCount() == 5) {

        //     console.log('time to check for win');
        // }
    }

    testFunc = () => {
        // console.log(referenceBoard.getValueAt(0,1))

        // if (testBoard.getValueAt(verticalWins[0][0][0], verticalWins[0][0][1]) == currentSymbol) {
        //     console.log("VERTICAL 1");
        // }
        // if (testBoard.getValueAt(verticalWins[0][1][0], verticalWins[0][1][1]) == currentSymbol) {
        //     console.log("VERTICAL 2");
        // }
        // if (testBoard.getValueAt(verticalWins[0][2][0], verticalWins[0][2][1]) == currentSymbol) {
        //     console.log("VERTICAL 3");
        // }

        for (winType in wins) {
            let typeName = '';

            if(winType==0)
            typeName='VERTICAL';
            else if(winType==1)
            typeName="HORIZONTAL";
            else if(winType==2)
            typeName="DIAGONAL";

            console.log(typeName);


            // for (i = 0; i < 3; i++) {
            for (i = 0; i<wins[winType].length; i++) {
            
                let matchCount = 0;
                // for (j = 0; j < 3; j++) {
                for (j = 0; j<wins[winType][i].length; j++) {
                
                    if ((testBoard.getValueAt(wins[winType][i][j][0], wins[winType][i][j][1]) == currentSymbol)) {
                        matchCount++;
                    }
                    console.log(typeName+' MATCHING WIN POSITIONS OF PATTERN '+ i+' ARE: ' + matchCount);

                    if(matchCount==3){
                        console.log('----------WIN FOUND----------');
                    }
                }
            }
        }

    }


    return {
        testFunc,
        currentTurn,
        getCurrentPlayer,
        getCurrentSymbol,
        switchTurn,
        checkForWin
    };
}


// NORMAL FUNCTION OR FACTORY FUNCTION?
// CREATE BOARD
// EXPORT BOARD
// MARK BOARD
// PRINT BOARD

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

function Game() {

}

// THIS WILL BE WRAPPED IN A FUNCTION Game IN THE END---------------------
// GLOBAL SCOPE
let players = [];
p1 = Player('player1', 'x');
p2 = Player('player2', 'o');

players.push(p1, p2);

let testBoard = gameBoard(); //DEFINE THE BOARD
let testRule = Rule(); //DEFINE THE RULES

testBoard.printBoard();
testRule.currentTurn();

testBoard.markBoard(0, 0);
testBoard.printBoard();
testBoard.markBoard(1, 0);
testBoard.printBoard();
testBoard.markBoard(2, 0);
testBoard.printBoard();

testRule.testFunc();
