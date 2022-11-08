import React from 'react';
import { render } from '@testing-library/react';
import { BasicToDoList } from './to-do-list.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicToDoList />);
  const rendered = getByText('To Do List!');
  expect(rendered).toBeTruthy();
});
