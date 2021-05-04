import React from "react"
import { useTranslation } from "react-i18next"


const SiteHeader = ({currentUser, setCurrentUser}) => {
  const {t} = useTranslation()

  async function processLogout(event) {
    event.preventDefault()

    window.localStorage.removeItem("loggedBlogListUser")
    setCurrentUser(null)
  }

  return (
    <div className="siteHeader">
      {currentUser
        ? <div className="userInfo">
            <span className="currentUserName">{t("SiteHeader.knownUser", {currentUser})}</span>
            <button onClick={processLogout}>{t("SiteHeader.cmdLogout")}</button>
          </div>
        : <div className="userInfo">
            <span className="currentUserName">{t("SiteHeader.unknownUser")}</span>
          </div>
      }
    </div>
  )
}

export default SiteHeader
