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
    currentUser
      ? <>
          <li className="currentUserName">{t("SiteHeader.knownUser", { currentUser })}</li>
          <li>
            <button type="button" onClick={ processLogout }>
              {t("SiteHeader.cmdLogout")}
            </button>
          </li>
        </>
      : <li className="currentUserName">{t("SiteHeader.unknownUser")}</li>
  )
}

SiteHeaderUserInfo.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
}

export default SiteHeaderUserInfo
