import { useState } from 'react'

export function useCounter() {
  const [count, setCount] = useState(0)
  const increment = () => setCount((c) => c + 2)
  const decrement = () => setCount((c) => c - 2)
  return { count, increment, decrement }
  // return { count, increment }
}
