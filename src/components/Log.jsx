export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
      {/* `` => template literal syntax that can be used in javascript to create a string and inject values in it */}
      {/* row col combination is unique as it can be selected only once hence it is made as a key */}
    </ol>
  );
}
