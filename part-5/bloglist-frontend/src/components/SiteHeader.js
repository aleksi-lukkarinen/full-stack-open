import SiteHeaderLanguageSelector from "./SiteHeaderLanguageSelector"
import SiteHeaderSeparator from "./SiteHeaderSeparator"
import SiteHeaderUserInfo from "./SiteHeaderUserInfo"


const SiteHeader = ({currentUser, setCurrentUser}) => {
  return (
    <div className="siteHeader">
      <SiteHeaderUserInfo
        currentUser={currentUser}
        setCurrentUser={setCurrentUser} />

      <SiteHeaderSeparator />

      <SiteHeaderLanguageSelector />
    </div>
  )
}

export default SiteHeader
