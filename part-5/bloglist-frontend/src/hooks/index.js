import { useState, useRef } from "react"


export const useField = (htmlID, htmlType) => {
  const fieldRef = useRef(null)
  const [value, setValue] = useState("")

  function onChange(event) {
    setValue(event.target.value)
  }

  function reset() {
    setValue("")
  }

  return {
    id: htmlID,
    type: htmlType,
    ref: fieldRef,
    value,
    onChange,
    reset,
  }
}


const hooks = {
  useField,
}

export default hooks
