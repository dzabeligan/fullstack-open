import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../helper';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <p>
          Name: {part.name} Exercise count: {part.exerciseCount} Description: {part.description}
        </p>
      );
    case 'New course':
      return (
        <p>
          Name: {part.name} Exercise count: {part.exerciseCount} Description: {part.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          Name: {part.name} Exercise count: {part.exerciseCount} Group project count: {part.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <>
    {courseParts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </>
);

export default Content;
