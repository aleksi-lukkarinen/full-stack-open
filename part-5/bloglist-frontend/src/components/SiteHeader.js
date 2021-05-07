import React from "react"

import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography } from "@material-ui/core"

import SiteHeaderUserMenu from "./SiteHeaderUserMenu"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

const SiteHeader = ({
  currentUser,
  setCurrentUser }) => {

  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed" className="siteHeader">
        <Toolbar>
          <Typography variant="h6" className={ classes.title }>
            BlogList
          </Typography>

          <SiteHeaderUserMenu
            currentUser={ currentUser }
            setCurrentUser={ setCurrentUser } />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

SiteHeader.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
}

export default SiteHeader
