import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>total {props.good + props.neutral + props.bad}</p>
      <p>
        avarage{" "}
        {(props.good - props.bad) / (props.good + props.neutral + props.bad)}
      </p>
      <p>
        positive {(props.good / (props.good + props.neutral + props.bad)) * 100}{" "}
        %
      </p>
    </>
  );
};

export default App;
