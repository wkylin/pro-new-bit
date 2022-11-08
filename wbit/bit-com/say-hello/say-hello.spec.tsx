import React from 'react';
import { render } from '@testing-library/react';
import { BasicSayHello } from './say-hello.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicSayHello />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
