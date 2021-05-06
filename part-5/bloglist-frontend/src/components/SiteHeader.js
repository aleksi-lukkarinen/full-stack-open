import React from "react"

import PropTypes from "prop-types"

import SiteHeaderLanguageSelector from "./SiteHeaderLanguageSelector"
import SiteHeaderSeparator from "./SiteHeaderSeparator"
import SiteHeaderUserInfo from "./SiteHeaderUserInfo"


const SiteHeader = ({
  currentUser,
  setCurrentUser }) => {

  return (
    <div className="siteHeader">
      <SiteHeaderUserInfo
        currentUser={ currentUser }
        setCurrentUser={ setCurrentUser } />

      <SiteHeaderSeparator />

      <SiteHeaderLanguageSelector />
    </div>
  )
}

SiteHeader.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
}

export default SiteHeader
