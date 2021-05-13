import React from "react"

import PropTypes from "prop-types"

import SimpleFormRow from "./SimpleFormRow"
import SubmitButton from "./SubmitButton"
import CancelButton from "./CancelButton"


const SimpleForm = ({
  submitId, submitTitle, onSubmit,
  cancelId, cancelTitle, onCancel,
  children }) => {

  const showCancel = cancelTitle !== undefined

  return (
    <form className="simpleForm" onSubmit={ onSubmit }>
      {children}
      <SimpleFormRow style={ { marginTop: "1em" } }>
        <SubmitButton
          id={ submitId }
          title={ submitTitle } />

        {showCancel &&
          <CancelButton
            id={ cancelId }
            title={ cancelTitle }
            onClick={ onCancel } />
        }
      </SimpleFormRow>
    </form>
  )
}

SimpleForm.propTypes = {
  submitId: PropTypes.string,
  submitTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cancelId: PropTypes.string,
  cancelTitle: PropTypes.string,
  onCancel: PropTypes.func,
  children: PropTypes.any,
}

export default SimpleForm
