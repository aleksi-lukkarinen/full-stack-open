import { makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import SectionHeader from "./SectionHeader"



const useStyles = makeStyles((theme) => ({
  mainTitle: {
    paddingBottom: "0.2em",
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: "2em",
  },
  loggedInBadge: {
    color: "white",
    backgroundColor: "#00aa00",
    fontSize: "70%",
    paddingTop: "0.2em",
    paddingBottom: "0.2em",
    paddingLeft: "0.3em",
    paddingRight: "0.3em",
    borderRadius: "0.4em",
  },
  blogName: {
    textDecoration: "initial",
    "&:hover": {
      color: "red",
    },
  }
}))

const UserView = ({ userToView, isLoggedIn }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  if (!userToView)
    return <></>

  const loggedInBadge = (
    <Typography
      variant="body1"
      component="span"
      className={ classes.loggedInBadge }>
      { t("UserView.loggedInLabel") }
    </Typography>
  )

  return (
    <>
      <SectionHeader
        variant="overline"
        content={ t("UserView.subTitleUserProfile") } />
      <SectionHeader
        variant="h1"
        className={ classes.mainTitle }
        content={ userToView.name } />

      <div className={ classes.badgeRow }>
        { isLoggedIn ? loggedInBadge : <></> }
      </div>

      <SectionHeader
        variant="h2"
        className={ classes.sectionTitle }
        content={ t("UserView.sectionTitleAddedBlogs") } />

      { !Array.isArray(userToView?.blogs)
          || userToView.blogs.length < 1
        ? <Typography style={ { fontStyle: "italic" } }>No blogs</Typography>
        : userToView.blogs.map(b => (
          <Link key={ b.id }
            to={ `/blogs/${b.id}` }
            className={ classes.blogName } >

            <Typography className={ classes.blogName }>{ b.title }</Typography>
          </Link>
        ))
      }
    </>
  )
}

export default UserView
