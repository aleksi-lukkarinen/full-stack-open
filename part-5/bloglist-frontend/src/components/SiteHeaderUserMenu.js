import React, { useState } from "react"

import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { Button, Divider, Menu, MenuItem } from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"


const ACTION_NONE = "none"
const ACTION_LOGIN = "login"
const ACTION_LOGOUT = "logout"
const ACTION_SWITCH_LANGUAGE = "switch-language"

const languageInfo = {
  en: { label: "In English", },
  fi: { label: "Suomeksi", },
}

const SiteHeaderUserMenu = ({
  currentUser,
  setCurrentUser }) => {

  const { t, i18n } = useTranslation()
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  const handleUserMenuOpening = (event) => {
    event.preventDefault()

    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuSelection = (actionName, data) => (event) => {
    event.preventDefault()

    setUserMenuAnchor(null)

    switch (actionName) {
      case ACTION_LOGIN:
        break

      case ACTION_LOGOUT:
        window.localStorage.removeItem("loggedBlogListUser")
        setCurrentUser(null)
        break

      case ACTION_SWITCH_LANGUAGE:
        i18n.changeLanguage(data)
        break

      default:
    }
  }

  return (
    <>
      <Button
        id="btnUserMenu"
        variant="text"
        color="inherit"
        onClick={ handleUserMenuOpening }>

        <AccountCircle className="userIcon" />
        {currentUser
          ? <span className="currentUserName">{t("SiteHeader.knownUser", { currentUser })}</span>
          : <span className="currentUserName">{t("SiteHeader.unknownUser")}</span>
        }
      </Button>

      <Menu
        id="user-menu"
        anchorEl={ userMenuAnchor }
        keepMounted
        open={ Boolean(userMenuAnchor) }
        onClose={ handleUserMenuSelection(ACTION_NONE) } >

        {
          Object.keys(languageInfo).map((lang) => {
            const isActiveLanguage = i18n.language === lang

            return (
              <MenuItem
                key={ lang } color="inherit"
                onClick={ handleUserMenuSelection(ACTION_SWITCH_LANGUAGE, lang) }
                disabled={ isActiveLanguage } >

                {languageInfo[`${lang}`].label}
              </MenuItem>
            )
          })
        }
        <Divider />

        {currentUser
          ? <MenuItem onClick={ handleUserMenuSelection(ACTION_LOGOUT) }>{t("UserMenu.logout")}</MenuItem>
          : <MenuItem onClick={ handleUserMenuSelection(ACTION_LOGIN) }>{t("UserMenu.login")}</MenuItem>
        }
      </Menu>
    </>
  )
}

SiteHeaderUserMenu.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
}

export default SiteHeaderUserMenu
