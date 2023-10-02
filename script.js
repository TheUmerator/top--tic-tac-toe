
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
const Rule = () => {

    currentPlayer = players[0].getName();

    const getCurrentPlayer=()=>currentPlayer;

    const turn = () => {
        console.log("its currently " + currentPlayer + "'s turn");
    }


    return {
        turn,
        getCurrentPlayer
    };
}


// NORMAL FUNCTION OR FACTORY FUNCTION?
// CREATE BOARD
// EXPORT BOARD
// MARK BOARD
// PRINT BOARD

function gameBoard(){

board = [];
rows = 3;
columns = 3;

// CREATE BOARD
for (i = 0; i < rows; i++) {
    board[i]=[];
    for (j = 0; j < columns; j++) {
        board[i].push(0);
    }
}


// MARK BOARD
const markBoard=(rows,columns)=>{
    board[rows,columns]=getCurrentPlayer.symbol;
}

// EXPORT BOARD
 const getBoard=()=>board;


//  PRINT BOARD
const printBoard=()=>{
    console.log(board);
}
return{
    getBoard,
    markBoard,
    printBoard
};
}

function Game (){

}

// THIS WILL BE WRAPPED IN A FUNCTION Game IN THE END---------------------
// GLOBAL SCOPE
let players = [];
p1 = Player('player1', 'x');
p2 = Player('player2', 'o');

players.push(p1, p2);

let testBoard=gameBoard();
let testRule=Rule();

// console.log(Rule.getCurrentPlayer());

