import React, { useState, useImperativeHandle } from "react"

import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { TextField } from "@material-ui/core"

import { useField } from "../hooks"
import SectionHeader from "./SectionHeader"
import SimpleForm from "./SimpleForm"
import SimpleFormRow from "./SimpleFormRow"
import Showable from "./Showable"


const BlogInsertionForm =
  React.forwardRef(({ handleBlogInsertion }, ref) => {

    const { t } = useTranslation()

    const [formIsVisible, setFormVisibility] = useState(false)

    const { reset:resetNewBlogTitle, ...newBlogTitle } =
      useField("txtNewBlogTitle", "text")
    const { reset:resetNewBlogAuthor, ...newBlogAuthor } =
      useField("txtNewBlogAuthor", "text")
    const { reset:resetNewBlogUrl, ...newBlogUrl } =
      useField("txtNewBlogUrl", "text")


    function handleInsertionForwarding(event) {
      event.preventDefault()

      handleBlogInsertion(
        newBlogTitle.value,
        newBlogAuthor.value,
        newBlogUrl.value)
    }

    function handleVisibilityChange() {
      if (formIsVisible) {
        const titleField = newBlogTitle.inputRef.current
        titleField.focus()
      }
    }

    function handleInsertionCancellation(event) {
      event.preventDefault()

      hide()
      clearFields()
    }

    function showForm() {
      setFormVisibility(true)
    }

    function hide() {
      setFormVisibility(false)
    }

    function clearFields() {
      resetNewBlogTitle()
      resetNewBlogAuthor()
      resetNewBlogUrl()
    }

    useImperativeHandle(ref, () => {
      return {
        show: showForm,
        hide,
        clearFields
      }
    })

    return (
      <>
        <Showable
          visibilityChanged={ handleVisibilityChange }
          contentIsVisible={ formIsVisible }
          showContent={ showForm }
          buttonLabel={ t("BlogInsertionForm.cmdOpenForm") }
          buttonId="cmdShowBlogInsertionForm">

          <SectionHeader
            content={ t("BlogInsertionForm.title") }
            thisIsFirstHeader={ true } />

          <SimpleForm
            submitTitle={ t("BlogInsertionForm.cmdInsert") }
            onSubmit={ handleInsertionForwarding }
            cancelTitle={ t("BlogInsertionForm.cmdCancel") }
            onCancel={ handleInsertionCancellation } >

            <SimpleFormRow>
              <TextField
                error={ newBlogTitle.value === "" }
                { ...newBlogTitle }
                variant="filled"
                size="small"
                label={ t("Forms.Required") }
                placeholder={ t("BlogInsertionForm.titleField.placeHolder") }
                helperText={ t("BlogInsertionForm.titleField.helperText") }
                InputLabelProps={ { shrink: true } } />
            </SimpleFormRow>
            <SimpleFormRow>
              <TextField
                { ...newBlogAuthor }
                variant="filled"
                size="small"
                hiddenLabel
                placeholder={ t("BlogInsertionForm.authorField.placeHolder") }
                helperText={ t("BlogInsertionForm.authorField.helperText") }
                style={ { marginTop: "1em" } }
                InputLabelProps={ { shrink: true } } />
            </SimpleFormRow>
            <SimpleFormRow>
              <TextField
                { ...newBlogUrl }
                error={ newBlogUrl.value === "" }
                variant="filled"
                size="small"
                autoComplete="url"
                label={ t("Forms.Required") }
                placeholder={ t("BlogInsertionForm.urlField.placeHolder") }
                helperText={ t("BlogInsertionForm.urlField.helperText") }
                style={ { marginTop: "1em" } }
                InputLabelProps={ { shrink: true } } />
            </SimpleFormRow>
          </SimpleForm>
        </Showable>
      </>
    )
  })

BlogInsertionForm.displayName = "BlogInsertionForm"

BlogInsertionForm.propTypes = {
  handleBlogInsertion: PropTypes.func.isRequired,
}


export default BlogInsertionForm
