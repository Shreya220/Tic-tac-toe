export default function GameBoard({ onSelectSquare, board }) {

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // function handleSelectSquare(rowIndex, colIndex) {
  //   // function triggered if square was selected
  //   setGameBoard((prevGameBoard) => {
  //     // prevGameBoard[rowIndex][colIndex] = "X"; //! Not recommended
  //     //? State that depends on objects or arrays should eb updated in an immutable way
  //     //* if state is object or array we are dealing with reference value in javascript. If updating like this then we are updating the value in memory even before the schedule state update execution - can lead to bugs

  //     //? PREFERRED
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
                {/* if playerSymbol is X or O( not null) then it means it is clicked so disable it. If it is null then it isn't clicked yet hence do not disable. */}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
