import { Component } from "react";
import { observer } from "mobx-react";
import timer from "../store";

class ClassComponent extends Component {
  render() {
    return (
      <div>
        <h2>Class Component</h2>

        <button onClick={() => timer.increment()}>Increase</button>
        <span> {timer.value} </span>
        <button onClick={() => timer.decrement()}>Decrease</button>
      </div>
    );
  }
}

export default observer(ClassComponent);
