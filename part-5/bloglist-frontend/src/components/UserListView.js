import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"

import SectionHeader from "./SectionHeader"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"



const useStyles = makeStyles((theme) => ({
  tableHeader: {
    textAlign: "left",
    fontWeight: "bold",
  },
}))

const UserListView = ({ users, currentUser }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div>
      <SectionHeader
        variant="h1"
        content={ t("UserList.title") } />

      <table>
        <thead>
          <tr>
            <th>
              <Typography
                variant="body1"
                className={ classes.tableHeader }>

                { t("UserList.columnTitleUser") }
              </Typography>
            </th>
            <th>
              <Typography
                variant="body1"
                className={ classes.tableHeader }>

                { t("UserList.columnTitleBlogsCreated") }
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          { users.map(u => (
            <tr key={ u.id }>
              <td>
                <Link to={ `/users/${u.id}` }>
                  <Typography variant="body1">
                    { u.name }
                  </Typography>
                </Link>
              </td>
              <td>
                <Typography variant="body1">
                  { u.blogs.length }
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

UserListView.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object,
}

export default UserListView
