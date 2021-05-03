import SimpleFormCell from "./SimpleFormCell"
import SimpleFormRow from "./SimpleFormRow"
import SubmitButton from "./SubmitButton"


const SimpleForm = ({onSubmit, submitTitle, children}) => {
  return (
    <form className="simpleForm" onSubmit={onSubmit}>
      {children}
      <SimpleFormRow>
        <SimpleFormCell />
        <SimpleFormCell>
          <SubmitButton title={submitTitle} />
        </SimpleFormCell>
      </SimpleFormRow>
    </form>
  )
}

export default SimpleForm
