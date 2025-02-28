import { useState } from "react";
function Player({ intialName, symbol, isActive, onChangeName }) {
  // can use useState more than once in a component if we have diff pieces os state to manage.
  const [playerName, setPlayerName] = useState(intialName);

  //  isEditing false means can't edit
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    //TODO: updating state based on previous state value - THE NORMAL WAY
    // if isEditing is true then make it false, if it is false then make it true.
    // setIsEditing(!isEditing); //schedules a state update

    //TODO: updating state based on previous state value - THE CORRECT WAY
    //! Why? because react dosn't change the state instantly it schedules the update. if we write multiple same lines too in the prev approach the fucntionality would be same as both are based on value of isEditing for the current execution
    //! this function should return the new state you want to set (same as isEditing but is dynamically be set and passed as a value by React when it calls this function.)
    // GUARANTEES THAT WE WILL ALWAYS BE WORKING WITH LATEST AVAILABLE STATE VALUE.

    setIsEditing((editing) => !editing);

    //? PREVIOUS
    // based on current value of isEditing
    // setIsEditing(!isEditing); //schedules state update to true
    // setIsEditing(!isEditing); //schedules state update to true
    //? CORRECT
    // gets latest state value at the point of time where the scheduled update is executed.
    // setIsEditing(editing => !editing); //schedules state update to true
    // setIsEditing(editing => !editing); //schedules state update to false as it is executed after the first scheduled update.
    // pass a function to the state updating function. this function will be called by react and it will automatically get the current state value. the value before the state updated here as an input
    if(isEditing){
      onChangeName(symbol, playerName);
    }
  }

  //* TWO WAY BINDING - we are getting a value out of this input(onChange) and we are feeding a value back in this input (value)
  function handleChange(event) {
    //* event - object describing event that was emitted
    setPlayerName(event.target.value);
    // target refers to the element that did emit the event(input element)
    // this input element has a value property which will hold the value the user tried to enter before its then again overwritten by value prop
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = 'Edit';

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    // * onChange will trigger for every keystroke
    // btnCaption = 'Save';
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
export default Player;
