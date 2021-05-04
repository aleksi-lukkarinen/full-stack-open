import React from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"


const SiteHeaderUserInfo = ({
  currentUser,
  setCurrentUser }) => {

  const { t } = useTranslation()

  function processLogout(event) {
    event.preventDefault()

    window.localStorage.removeItem("loggedBlogListUser")
    setCurrentUser(null)
  }

  return (
    <span className="userInfo">
      {currentUser
        ? <>
            <span className="currentUserName">{t("SiteHeader.knownUser", { currentUser })}</span>
            <button onClick={ processLogout }>{t("SiteHeader.cmdLogout")}</button>
          </>
        : <span className="currentUserName">{t("SiteHeader.unknownUser")}</span>
      }
    </span>
  )
}

SiteHeaderUserInfo.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
}

export default SiteHeaderUserInfo
