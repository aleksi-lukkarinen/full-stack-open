import React from "react"


const SiteHeader = ({currentUser, setCurrentUser}) => {

  async function processLogout(event) {
    window.localStorage.removeItem("loggedBlogListUser")
    setCurrentUser(null)
  }

  return (
    <div className="siteHeader">
      {currentUser
        ? <div className="userInfo">
            <span className="currentUserName">{currentUser.name} logged in.</span>
            <button onClick={() => processLogout()}>Log out</button>
          </div>
        : <div className="userInfo">
            <span className="currentUserName">Unknown User</span>
          </div>
      }
    </div>
  )
}

export default SiteHeader
