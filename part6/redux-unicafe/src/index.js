import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const Statistics = ({ good, neutral, bad }) => (
  <>
    {good || neutral || bad ? (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
          <Statistic text="positive" value={(good / (good + neutral + bad)) * 100 + '%'} />
        </tbody>
      </table>
    ) : (
      <p>No feedback given</p>
    )}
  </>
);

const Statistic = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const handleGoodClick = () => store.dispatch({ type: 'GOOD' });
  const handleNeutralClick = () => store.dispatch({ type: 'NEUTRAL' });
  const handleBadClick = () => store.dispatch({ type: 'BAD' });

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <br />
      <h2>statistics</h2>
      <Statistics good={store.getState().good} neutral={store.getState().neutral} bad={store.getState().bad} />
    </div>
  );
};
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
