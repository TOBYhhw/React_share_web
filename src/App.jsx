import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import Index from './components/Index/Index'
import MyAdmin from './components/MyAdmin/MyAdmin'
import "./App.css"
export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/index" component={Index} />
          <Route path="/myadmin" component={MyAdmin} />
          <Redirect to="/index" />
        </Switch>
      </div>
    )
  }
}

