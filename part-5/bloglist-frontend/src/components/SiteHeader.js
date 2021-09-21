import React from "react"
import { useTranslation } from "react-i18next"

import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

import SiteHeaderUserMenu from "./SiteHeaderUserMenu"
import { Link } from "react-router-dom"



const useStyles = makeStyles((theme) => ({
  siteName: {
    marginRight: "2em",
  },
  sectionName: {
    color: "white",
    marginRight: "1em",
    textDecorationColor: "white",
  },
  divider: {
    flexGrow: 1,
  },
}))

const SiteHeader = () => {

  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed" className="siteHeader">
        <Toolbar>
          <Typography variant="h6" className={ classes.siteName }>
            BlogList
          </Typography>

          <Link to="/blogs" className={ classes.sectionName }>
            <Typography>
              { t("SiteHeader.sections.blogs") }
            </Typography>
          </Link>

          <Link to="/users" className={ classes.sectionName }>
            <Typography>
              { t("SiteHeader.sections.users") }
            </Typography>
          </Link>

          <div className={ classes.divider } />

          <SiteHeaderUserMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default SiteHeader
