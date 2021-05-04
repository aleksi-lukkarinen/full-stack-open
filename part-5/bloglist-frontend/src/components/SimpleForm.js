import React from "react"

import PropTypes from "prop-types"

import SimpleFormCell from "./SimpleFormCell"
import SimpleFormRow from "./SimpleFormRow"
import SubmitButton from "./SubmitButton"


const SimpleForm = ({
  submitTitle, onSubmit,
  cancelTitle, onCancel,
  children }) => {

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

SimpleForm.propTypes = {
  submitTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cancelTitle: PropTypes.string,
  onCancel: PropTypes.func,
  children: PropTypes.any,
}

export default SimpleForm
