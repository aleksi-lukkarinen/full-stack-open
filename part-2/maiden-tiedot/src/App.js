import * as conf from "./Config"
import ApplicationTitle from "./components/ApplicationTitle"

function App() {
  return (
    <>
      <ApplicationTitle content={conf.APPLICATION_TITLE} />
    </>
  )
}

export default App
