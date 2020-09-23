import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';
import { act } from 'react-dom/test-utils';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const newBlog = jest.fn();

  const component = render(<BlogForm newBlog={newBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  act(() => {
    fireEvent.change(title, {
      target: { value: 'React patterns' },
    });
    fireEvent.change(url, {
      target: { value: 'https://reactpatterns.com' },
    });
    fireEvent.change(author, {
      target: { value: 'Michael Chan' },
    });
    fireEvent.submit(form);
  });

  expect(newBlog.mock.calls).toHaveLength(1);
});
