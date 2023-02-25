import React, { useState } from 'react';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(index === 0){
      return "(1,1)";
    } else if(index === 1){
      return "(2,1)";
    } else if(index === 2){
      return "(3,1)";
    } else if(index === 3){
      return "(1,2)";
    } else if(index === 4){
      return "(2,2)";
    } else if(index === 5){
      return "(3,2)";
    } else if(index === 6){
      return "(1,3)";
    } else if(index === 7){
      return "(2,3)";
    } else if(index === 8){
      return "(3,3)";
    } else {
      return "!there is an index error";
    }
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return ("Coordinates " + getXY(index))
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function getNextIndex(input) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const direction = input.target.id;
    if(direction === "left"){
      if(index !== 0 && index !== 3 && index !== 6){
        setIndex(index - 1);
        setSteps(steps + 1);
      }else{
        setMessage("You can't go left");
      }
    }else if(direction === "up"){
      if(index - 3 >= 0){
        setIndex(index - 3);
        setSteps(steps + 1);
      }else{
        setMessage("You can't go up");
      }
    }else if(direction === "right"){
      if(index !== 2 && index !== 5 && index !== 8){
        setIndex(index + 1);
        setSteps(steps + 1);
      }else{
        setMessage("You can't go right");
      }
    }else if(direction === "down"){
      if(index + 3 <= 8){
        setIndex(index + 3);
        setSteps(steps + 1);
      }else{
        setMessage("You can't go down");
      }
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    //do more here josh
  }

  return (

    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={getNextIndex}>LEFT</button>
        {/* minus one */}
        <button id="up" onClick={getNextIndex}>UP</button>
        {/* minus 3? */}
        <button id="right" onClick={getNextIndex}>RIGHT</button>
        {/* plus one */}
        <button id="down" onClick={getNextIndex}>DOWN</button>
        {/* plus 3? */}
        <button id="reset" onClick={reset}>reset</button>
        {/* default back to original state */}
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
