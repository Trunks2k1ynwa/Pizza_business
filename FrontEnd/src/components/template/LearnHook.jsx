import { useCallback, useDebugValue, useState } from "react"
import SonCon from "./Childrent.jsx"

const LearnHook = () => {
  const [state, setState] = useState(0)
  const isOnline = false
  const handleIncrement = useCallback(()=> {
    setState(p=>p+1)
  },[])
  console.log('Parent re-render')
  useDebugValue(isOnline?'online':'offline')
  return (
    <div>
      <p>Count: {state}</p>
      <button onClick={handleIncrement}>Increment</button>
      <SonCon onClick={handleIncrement} />
    </div>
  )
}

export default LearnHook