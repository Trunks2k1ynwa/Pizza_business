/* eslint-disable react/prop-types */
import { memo } from "react"

const SonCon = ({onClick}) => {
  console.log("🚀 ~ SonCon:", 'render in SonCon')
  return (
    <div>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}

export default memo(SonCon)