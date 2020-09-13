import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part part={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  function getTotalForObjectFieldInArray(array, field) {
    return array.map((item) => item[field]).reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={getTotalForObjectFieldInArray(course.parts, 'exercises')} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
