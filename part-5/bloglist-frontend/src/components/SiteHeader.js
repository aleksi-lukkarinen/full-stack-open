import React from "react"

import PropTypes from "prop-types"

import SiteHeaderLanguageSelector from "./SiteHeaderLanguageSelector"
import SiteHeaderSeparator from "./SiteHeaderSeparator"
import SiteHeaderUserInfo from "./SiteHeaderUserInfo"
import BrToHide from "./BrToHide"


const SiteHeader = ({
  currentUser,
  setCurrentUser }) => {

  return (
    <ul className="siteHeader">
      <SiteHeaderUserInfo
        currentUser={ currentUser }
        setCurrentUser={ setCurrentUser } />

      <SiteHeaderSeparator />

      <SiteHeaderLanguageSelector />
      <BrToHide />
    </ul>
  )
}

SiteHeader.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
}

export default SiteHeader
