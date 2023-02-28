import React from 'react'
import axios from "axios";

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(props){
    super(props);
    this.state = {
      index: initialIndex,
      steps: initialSteps,
      email: initialEmail,
      message: initialMessage,
    };
    this.x = 2;
    this.y = 2;
  }

  getXY = (index) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(index === 0){
      this.x = 1;
      this.y = 1;
    } else if(index === 1){
      this.x = 2;
      this.y = 1
    } else if(index === 2){
      this.x = 3;
      this.y = 1;
    } else if(index === 3){
      this.x = 1;
      this.y = 2;
    } else if(index === 4){
      this.x = 2;
      this.y = 2;
    } else if(index === 5){
      this.x = 3;
      this.y = 2;
    } else if(index === 6){
      this.x = 1;
      this.y = 3;
    } else if(index === 7){
      this.x = 2;
      this.y = 3;
    } else if(index === 8){
      this.x = 3;
      this.y = 3;
    } else {
      console.log("!there is an index error", index);
    }
    return this.getXYMessage(this.x, this.y);
  }

  getXYMessage = ( x, y ) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates (${x},${y})`;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      index: initialIndex,
      steps: initialSteps,
      message: initialMessage
    });
  }

  getNextIndex = (input) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const direction = input.target.id;
    const { index, steps } = this.state;
    if (direction === "left") {
      if(index !== 0 && index !== 3 && index !== 6){
        this.setState({ index: index - 1, steps: steps + 1});
      } else {
        this.setState({ message: "You can't go left" });
      }
    } else if (direction === "up") {
      if(index - 3 >= 0){
        this.setState({ index: index - 3, steps: steps + 1});
      } else {
        this.setState({ message: "You can't go up" });
      }
    } else if (direction === "right") {
      if(index !== 2 && index !== 5 && index !== 8){
        this.setState({ index: index + 1, steps: steps + 1});
      } else {
        this.setState({ message: "You can't go right" });
      }
    } else if (direction === "down") {
      if(index+ 3 <= 8){
        this.setState({ index: index + 3, steps: steps + 1});
      } else {
        this.setState({ message: "You can't go down" });
      }
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.getNextIndex(evt);
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({ email: evt.target.value });
  }

  onSubmit = (event) => {
    // Use a POST request to send a payload to the server.
    event.preventDefault();
    const form = { x: this.x, y: this.y, steps: this.state.steps, email: this.state.email };
    let oldEmail = document.getElementById("email");
    axios.post("http://localhost:9000/api/result", form)
      .then((response) => {
        console.log(response.data.message);
        this.setState({ message: response.data.message })
      })
    this.reset();
    if(this.state.email !== ""){
      this.setState({ email: "" })
    }
    if(oldEmail.value !== ""){
      oldEmail.value = "";
    }
  }

  render() {
    const { className } = this.props
    const { x, y, steps, index, message } = this.state;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXY(this.state.index)}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit" onClick={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
