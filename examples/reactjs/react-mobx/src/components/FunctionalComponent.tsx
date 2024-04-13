import { observer } from "mobx-react";
import timer from "../store";

function FunctionalComponent() {
  return (
    <div>
      <h2>Functional Component</h2>

      <button onClick={() => timer.increment()}>Increase</button>
      <span> {timer.value} </span>
      <button onClick={() => timer.decrement()}>Decrease</button>
    </div>
  );
}

export default observer(FunctionalComponent);
