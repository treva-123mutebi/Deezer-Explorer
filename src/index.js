import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './style.css'
import SearchResult from './views/search-result'
import Home from './views/home'
import Artist from './views/artist'

const App = () => {
  return (
    <Router>
      <div>
        <Route component={SearchResult} exact path="/search-result" />
        <Route component={Home} exact path="/" />
        <Route component={Artist} exact path="/artist" />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
