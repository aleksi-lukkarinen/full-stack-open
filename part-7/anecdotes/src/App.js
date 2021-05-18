import React, { useState, useEffect } from 'react'

import {
  useHistory, Switch, Route, Link, useRouteMatch,
} from "react-router-dom"


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>Anecdotes</Link>
      <Link to="/create" style={padding}>Create New</Link>
      <Link to="/about" style={padding}>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(anecdote =>
          <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>
        )
      }
    </ul>
  </div>
)

const AnecdoteInfo = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div style={{marginBottom: "1em"}}>has {anecdote.votes} vote(s)</div>
      <div style={{marginBottom: "2em"}}>
        for more info,
        see: <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setNotification({
      content: `The following anecdote was added: ${content}`,
      creationTimestamp: Date.now(),
    })
    history.push("/")
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const Notification = ({
  notification, setNotification}) => {

  useEffect(() => {
    /*
      This would be better to be in some kind of service, but
      as there will be only one instance of the Notification
      and it will be rerendered when a new notification comes
      in, this works as well. Also, this should be generalized
      to handle an array of notifications with varying types
      and visibility times.
    */

    const visibilityTimeInMs = 10000

    let timeoutHandle = 0

    function checkNotificationClearing() {
      clearTimeout(timeoutHandle)

      const passedTimeMs =
          Date.now() - notification.creationTimestamp

      if (passedTimeMs > visibilityTimeInMs) {
        setNotification({})
      }
      else {
        timeoutHandle = setTimeout(
            checkNotificationClearing,
            visibilityTimeInMs - passedTimeMs)
      }
    }

    if (notification.content) {
      timeoutHandle = setTimeout(
          checkNotificationClearing,
          visibilityTimeInMs)
    }

    return () => {
      clearTimeout(timeoutHandle)
    }
  }, [notification, setNotification])

  const style = !notification.content ? undefined : {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState({})

  const routeMatchAnecdote = useRouteMatch("/anecdotes/:id")
  const anecdoteFromRoute = routeMatchAnecdote
    ? anecdotes.find(a => a.id === routeMatchAnecdote.params.id)
    : null

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />

      <Notification
          notification={notification}
          setNotification={setNotification} />

      <Switch>
        <Route path="/anecdotes/:id">
          <AnecdoteInfo anecdote={anecdoteFromRoute} />
        </Route>
        <Route path="/create">
          <CreateNew
              addNew={addNew}
              setNotification={setNotification} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App
