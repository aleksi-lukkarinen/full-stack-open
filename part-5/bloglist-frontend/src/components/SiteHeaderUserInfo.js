import { useTranslation } from "react-i18next"


const SiteHeaderUserInfo = ({ currentUser, setCurrentUser }) => {
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

export default SiteHeaderUserInfo
