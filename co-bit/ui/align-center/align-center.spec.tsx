import React from 'react'
import { render } from '@testing-library/react'
import { BasicAlignCenter } from './align-center.composition'

it('should render with the correct text', () => {
  const { getByText } = render(<BasicAlignCenter />)
  const rendered = getByText('hello world!')
  expect(rendered).toBeTruthy()
})
