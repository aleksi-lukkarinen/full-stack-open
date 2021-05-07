import React from "react"

import PropTypes from "prop-types"

import SimpleFormRow from "./SimpleFormRow"
import SubmitButton from "./SubmitButton"
import CancelButton from "./CancelButton"


const SimpleForm = ({
  submitTitle, onSubmit,
  cancelTitle, onCancel,
  children }) => {

  const showCancel = cancelTitle !== undefined

  return (
    <form className="simpleForm" onSubmit={ onSubmit }>
      {children}
      <SimpleFormRow style={ { marginTop: "1em" } }>
        <SubmitButton title={ submitTitle } />

        {showCancel &&
          <CancelButton
            title={ cancelTitle }
            onClick={ onCancel } />
        }
      </SimpleFormRow>
    </form>
  )
}

SimpleForm.propTypes = {
  submitTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cancelTitle: PropTypes.string,
  onCancel: PropTypes.func,
  children: PropTypes.any,
}

export default SimpleForm
