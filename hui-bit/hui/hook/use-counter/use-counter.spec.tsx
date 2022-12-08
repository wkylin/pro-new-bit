import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from './use-counter'

it('should increment counter', () => {
  const { result } = renderHook(() => useCounter())
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(2)
})
