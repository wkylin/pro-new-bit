import React from 'react';
import { render } from '@testing-library/react';
import { BasicToDo } from './to-do.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicToDo />);
  const rendered = getByText('Button');
  expect(rendered).toBeTruthy();
});
