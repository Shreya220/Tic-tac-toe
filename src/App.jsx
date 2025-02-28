import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X : 'Player 1', 
  O : 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  //? deriving the symbol of currently active player
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner; // winner is undefined in the beginning
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    // null in JavaScript is treated as false. If value is null then no need to check for winning-combination
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // every object in turns array will be of the form mentioned in App Component for updatedTurns array
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    //? player consists of player symbol and row and col consists of row and column index.
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

//? We will lift the STATE UP to the CLOSEST ANCESTOR COMPONENT that has access to all components that need to work with that state (if we need same state change for both the components; hard to do individually so we do it for ancestor component and then we can pass to child components via props)
function App() {
  // state to store currenly set player name, players are coupled with their symbol hence we will use object to map them
  const [players, setPlayers] = useState(PLAYERS);

  // whenever a square is selected we want to add a new turn to this array
  const [gameTurns, setGameTurns] = useState([]);

  // const [activePlayer, setActivePlayer] = useState("X"); // we will do this from deriving the state rather than managing other state

  // We need gameboard here hence the code for it should be here
  //Todo: Below, we are Deriving the State (we aren't managing any state here)

  //! we are overriding the intialGameBoard so when we need to restart the game then we need to make the initialGameBoard empty as well. can solve this by making deep copy of intialGameBoard and its inner arrays. Hence with this we added a brand new array and not that initial array in memory.

  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  //  We can have maximum 9 game turns coz we have 9 buttons to populate. So, if we have the length of gameTurns = 9 i.e., all the turns we can possibly have and no winner then it means its a draw.
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      // first item in array is always the latest turn
      return updatedTurns;
    });
  }

  //! to restart the game we have to set the gameTurns state to empty array or to say clear the log since we are deriving all the other data from this state.
  function handleRestart() {
    setGameTurns([]);
  }

  //! setPlayers should be called whenever we click 'Save' button in Player component not on every keystroke
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers, // getting the prev stuff keeping the name and symbol of unchanged player
        [symbol]: newName, // updating the value
      };
    }); // update state based on prev one because only one name changed here
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* whenever we are using or reusing a component react creates a new ISOLATED INSTANCE. so both these players work totally isolated from each other. state change in one doesn't affect the other. */}
          <Player
            intialName= {PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            intialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* if winner present then show the GameOver component */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* Square is getting selected in the GameBoard Component */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
