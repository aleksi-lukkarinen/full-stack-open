import { useState } from "react"


export const useField = (htmlID, htmlType) => {
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
    value,
    onChange,
    reset,
  }
}


const hooks = {
  useField,
}

export default hooks
