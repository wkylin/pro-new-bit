import React from 'react';
import { render } from '@testing-library/react';
import { BasicWuiReact } from './wui-react.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicWuiReact />);
  const rendered = getByText('hello from WuiReact');
  expect(rendered).toBeTruthy();
});