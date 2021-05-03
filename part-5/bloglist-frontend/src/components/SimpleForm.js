import SimpleFormCell from "./SimpleFormCell"
import SimpleFormRow from "./SimpleFormRow"
import SubmitButton from "./SubmitButton"


const SimpleForm = ({
  submitTitle, onSubmit,
  cancelTitle, onCancel,
  children}) => {

  const showCancel = cancelTitle !== undefined

  return (
    <form className="simpleForm" onSubmit={onSubmit}>
      {children}
      <SimpleFormRow>
        <SimpleFormCell />
        <SimpleFormCell>
          <SubmitButton title={submitTitle} />

          {showCancel &&
            <button onClick={onCancel}>{cancelTitle}</button>
          }
        </SimpleFormCell>
      </SimpleFormRow>
    </form>
  )
}

export default SimpleForm
