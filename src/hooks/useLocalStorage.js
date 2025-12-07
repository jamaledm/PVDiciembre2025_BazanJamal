import { useState } from 'react'

export function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })

  function set(value) {
    setState(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [state, set]
}
