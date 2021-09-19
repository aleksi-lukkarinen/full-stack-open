import React from "react"

import { makeStyles, Typography } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import SectionHeader from "./SectionHeader"



const useStyles = makeStyles((theme) => ({
  blogTitle: {
    paddingBottom: "0.2em",
  },
  blogAuthor: {
    paddingBottom: "1.5em",
  },
  blogAdder: {
    marginTop: "1em",
    "&:hover": {
      color: "red",
    },
  },
  blogLink: {
    fontSize: "8pt",
    textDecoration: "initial",
    "&:hover": {
      color: "red",
    },
  }
}))

const BlogView = ({ blog, handleAddLike }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  if (!blog) {
    return <></>
  }

  return (
    <>
      <SectionHeader
        variant="overline"
        content={ t("BlogView.subTitleBlog") } />
      <SectionHeader
        variant="h1"
        className={ classes.blogTitle }
        content={ blog.title } />

      <div>
        <Typography
          className={ classes.blogAuthor }
          variant="body1">

          { blog.author }
        </Typography>
      </div>

      <div>
        <button
          type="button"
          className="btnLike"
          onClick={ handleAddLike(blog) }>

          {t("BlogListItem.btnLike")}
        </button>

        <Typography
          className={ classes.blogLikes }
          variant="body1">

          { t("BlogListItem.likes", { "count": blog.likes }) }
        </Typography>
      </div>

      <div>
        <Link to={ `/users/${blog.user.id}` }>
          <Typography
            className={ classes.blogAdder }
            variant="body1">

            { blog.user.name }
          </Typography>
        </Link>
      </div>

      <div>
        <a href={ blog.url }>
          <Typography
            className={ classes.blogLink }
            variant="body1">

            { blog.url }
          </Typography>
        </a>
      </div>

    </>
  )
}

export default BlogView
