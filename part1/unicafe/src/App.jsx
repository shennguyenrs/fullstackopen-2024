import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleAddGood = () => {
    setGood(good + 1);
  };

  const handleAddNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleAddBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleAddGood} text="good" />
      <Button onClick={handleAddNeutral} text="neutral" />
      <Button onClick={handleAddBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="total" value={good + neutral + bad} />
        <StatisticsLine
          text="avarage"
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticsLine
          text="positive"
          value={(good / (good + neutral + bad)) * 100}
        />
      </tbody>
    </table>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
