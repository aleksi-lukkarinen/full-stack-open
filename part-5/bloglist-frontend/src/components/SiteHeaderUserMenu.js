import React, { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Button, Divider, Menu, MenuItem } from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { clearCurrentUser } from "../reducers/currentUserReducer"


const ACTION_NONE = "none"
const ACTION_LOGIN = "login"
const ACTION_LOGOUT = "logout"
const ACTION_SWITCH_LANGUAGE = "switch-language"

const languageInfo = {
  en: { label: "In English", },
  fi: { label: "Suomeksi", },
}

const SiteHeaderUserMenu = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
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
        dispatch(clearCurrentUser())
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

        {!currentUser ? null : [
          <Divider key="div1" />,
          <MenuItem key="logout" onClick={ handleUserMenuSelection(ACTION_LOGOUT) }>
            { t("UserMenu.logout") }
          </MenuItem>
        ]}
      </Menu>
    </>
  )
}

export default SiteHeaderUserMenu
