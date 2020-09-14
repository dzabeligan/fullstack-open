import React from 'react';

import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
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

export default Course;
