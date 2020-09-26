import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blogs from './Blogs';

const blog = {
  id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: {
    id: '5a422a851b54a676234d16y6',
    name: 'Elijah Balogun',
    username: 'dzabeligan',
  },
};

test('render blog title and author', () => {
  const component = render(<Blogs />);

  expect(component.container).toHaveTextContent('React patterns');
  expect(component.container).toHaveTextContent('Michael Chan');
  expect(component.container).not.toHaveTextContent('Elijah Balogun');
  expect(component.container).not.toHaveTextContent('https://reactpatterns.com/');
});

test('render all blog info after toggling visibilty', () => {
  const component = render(<Blogs />);

  const ToggleButton = component.getByText('view');
  fireEvent.click(ToggleButton);

  expect(component.container).toHaveTextContent('React patterns');
  expect(component.container).toHaveTextContent('Michael Chan');
  expect(component.container).toHaveTextContent('Elijah Balogun');
  expect(component.container).toHaveTextContent('likes 7');
  expect(component.container).toHaveTextContent('https://reactpatterns.com/');
});

test('clicking the like button twice calls event handler twice as well', () => {
  const mockHandler = jest.fn();

  const component = render(<Blog />);

  const ToggleButton = component.getByText('view');
  fireEvent.click(ToggleButton);

  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
