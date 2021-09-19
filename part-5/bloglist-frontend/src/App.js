import React, { useState, useEffect } from "react"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"

import Container from "@material-ui/core/Container"

import * as C from "./utils/constants"
import userService from "./services/userService"
import blogService from "./services/blogService"
import LoginView from "./components/LoginView"
import BlogListView from "./components/BlogListView"
import SiteHeader from "./components/SiteHeader"
import Notification from "./components/Notification"
import UserListView from "./components/UserListView"
import UserView from "./components/UserView"
import BlogView from "./components/BlogView"






const App = () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserChecked, setCurrentUserChecked] = useState(false)

  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const handleAddLike = blog => event => {
    event.preventDefault()

    const sourceButton = event.target

    sourceButton.disabled = true

    blogService
        .like(blog)
        .then(updatedBlog => {
          const allBlogs =
            blogs.map(x => x.id === blog.id ? updatedBlog : x)
          setBlogs(allBlogs)
        })
        .finally(() => {
          sourceButton.disabled = false
        })
  }

  const initCurrentUser = (user) => {
    if (user) {
      blogService.setAuthToken(user.token)
      setCurrentUser(user)
    }
    else {
      window.localStorage.removeItem(C.LS_ID_USER_JSON)
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    const checkForCurrentUser = () => {
      const loggedUserJSON =
      window.localStorage.getItem(C.LS_ID_USER_JSON)

      if (loggedUserJSON === null || typeof(loggedUserJSON) !== "string") {
        initCurrentUser()
        return
      }

      const userCandidate = JSON.parse(loggedUserJSON)
      if (!userCandidate?.id) {
        initCurrentUser()
        return
      }

      initCurrentUser(userCandidate)
    }

    checkForCurrentUser()
    setCurrentUserChecked(true)

    userService.getAll().then(foundUsers => {
      setUsers(foundUsers)
    })

    blogService.getAll().then(foundBlogs => {
      setBlogs(foundBlogs)
    })
  }, [])

  const routeMatchUser = useRouteMatch("/users/:id")
  const userToView = !routeMatchUser ? null :
    users.find(user => user.id === routeMatchUser.params.id)

  const routeMatchBlog = useRouteMatch("/blogs/:id")
  const blogToView = !routeMatchBlog ? null :
    blogs.find(blog => blog.id === routeMatchBlog.params.id)

  const redirectToLogin = <Redirect to="/login" />
  const messageParams = { setInfoMessage, setErrorMessage }

  return (
    <Container maxWidth="sm">
      <SiteHeader
        currentUser={ currentUser }
        setCurrentUser={ setCurrentUser } />

      <Notification
        content={ errorMessage }
        severity="error" />

      <Notification
        content={ infoMessage }
        severity="success" />

      { !currentUserChecked ? <></> :
          <Switch>
            <Route exact path="/users/:id">
              { !currentUser ? redirectToLogin
                : <UserView
                    userToView={ userToView }
                    isLoggedIn={ !userToView ? false : userToView.id === currentUser.id } />
              }
            </Route>

            <Route exact path="/users">
              { !currentUser ? redirectToLogin
                : <UserListView { ...messageParams }
                    users={ users }
                    currentUser={ currentUser } />
              }
            </Route>

            <Route exact path="/blogs/:id">
              { !currentUser ? redirectToLogin
                : <BlogView
                    blog={ blogToView }
                    handleAddLike={ handleAddLike } />
              }
            </Route>

            <Route exact path="/blogs">
              { !currentUser ? redirectToLogin
                : <BlogListView { ...messageParams }
                    blogs={ blogs }
                    setBlogs={ setBlogs }
                    users={ users }
                    setUsers={ setUsers }
                    currentUser={ currentUser } />
              }
            </Route>

            <Route exact path="/login">
              { currentUser ? <Redirect to="/blogs" />
                : <LoginView { ...messageParams }
                    setCurrentUser={ setCurrentUser } />
              }
            </Route>

            <Redirect to="/blogs" />
          </Switch>
      }
    </Container>
  )
}


export default App
