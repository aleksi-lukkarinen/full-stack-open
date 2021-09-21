import React, { useState, useEffect } from "react"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import Container from "@material-ui/core/Container"

import * as C from "./utils/constants"
import { setCurrentUser, clearCurrentUser } from "./reducers/currentUserReducer"
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
  const dispatch = useDispatch()

  const [users, setUsers] = useState([])
  const currentUser = useSelector(state => state.currentUser)
  const [currentUserChecked, setCurrentUserChecked] = useState(false)

  const [blogs, setBlogs] = useState([])

  const infoNotification =
      useSelector(state => state.notifications.info)

  const errorNotification =
      useSelector(state => state.notifications.error)

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

  useEffect(() => {
    const initCurrentUser = (user) => {
      if (user) {
        blogService.setAuthToken(user.token)
        dispatch(setCurrentUser(user))
      }
      else {
        window.localStorage.removeItem(C.LS_ID_USER_JSON)
        dispatch(clearCurrentUser())
      }
    }

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
  }, [dispatch])

  const routeMatchUser = useRouteMatch("/users/:id")
  const userToView = !routeMatchUser ? null :
    users.find(user => user.id === routeMatchUser.params.id)

  const routeMatchBlog = useRouteMatch("/blogs/:id")
  const blogToView = !routeMatchBlog ? null :
    blogs.find(blog => blog.id === routeMatchBlog.params.id)

  const redirectToLogin = <Redirect to="/login" />

  return (
    <Container maxWidth="sm">
      <SiteHeader />

      <Notification
        content={ errorNotification }
        severity="error" />

      <Notification
        content={ infoNotification }
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
                : <UserListView users={ users } />
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
                : <BlogListView
                    blogs={ blogs }
                    setBlogs={ setBlogs }
                    users={ users }
                    setUsers={ setUsers } />
              }
            </Route>

            <Route exact path="/login">
              { currentUser ? <Redirect to="/blogs" /> : <LoginView /> }
            </Route>

            <Redirect to="/blogs" />
          </Switch>
      }
    </Container>
  )
}


export default App
