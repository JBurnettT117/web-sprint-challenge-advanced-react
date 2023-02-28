import React, { useState } from 'react';
import axios from "axios";

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

  let x = 2;
  let y = 2;

  function getXY(index) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(index === 0){
      x = 1;
      y = 1;
    } else if(index === 1){
      x = 2;
      y = 1;
    } else if(index === 2){
      x = 3;
      y = 1;
    } else if(index === 3){
      x = 1;
      y = 2;
    } else if(index === 4){
      x = 2;
      y = 2;
    } else if(index === 5){
      x = 3;
      y = 2;
    } else if(index === 6){
      x = 1;
      y = 3;
    } else if(index === 7){
      x = 2;
      y = 3;
    } else if(index === 8){
      x = 3;
      y = 3;
    } else {
      console.log("!there is an index error", index);
    }
    return getXYMessage(x, y);
  }

  function getXYMessage(x, y) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // getXY(index);
    return `Coordinates (${x}, ${y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
    let oldEmail = document.getElementById("email");
    if(oldEmail.value !== ""){
      oldEmail.value = "";
    }
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
    //this is for email josh
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    if(email === ""){
      setMessage("Ouch: email is required");
      return;
    }
    if(validateEmail(email) === false){
      setMessage("Ouch: email must be a valid email");
      return
    }
    if(email === "foo@bar.baz"){
      setMessage("foo@bar.baz failure #71")
      return
    }
    let oldEmail = document.getElementById("email");
    if(oldEmail.value === ""){
      setMessage("Ouch: email is required")
      return;
    }
    let form = { x, y, steps, email};
    axios.post("http://localhost:9000/api/result", form)
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
      })
    // reset();
    setEmail(initialEmail);
    if(oldEmail.value !== ""){
      oldEmail.value = "";
    }
    //we have all of our data just get the post correct and we are done here
  }

  function sSetter(steps){
    if(steps === 1 ){
      return "";
    }else {
      return "s";
    }
  }

  function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  return (

    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXY(index)}</h3>
        <h3 id="steps">You moved {steps} time{sSetter(steps)}</h3>
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
        <button id="up" onClick={getNextIndex}>UP</button>
        <button id="right" onClick={getNextIndex}>RIGHT</button>
        <button id="down" onClick={getNextIndex}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" onChange={onChange} ></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  )
}
