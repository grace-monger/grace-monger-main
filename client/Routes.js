import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Routes, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import AllCheese from './components/AllCheese'
import AllWines from './components/AllWines'
import Home from './components/Home';
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Redirect to="/home" />
          </Routes>
        ) : (
          <Routes>
            <Route exact path='/' element={ <Login /> } />
            <Route exact path='/cheeses' element={ <AllCheese /> } />
            <Route exact path='/wines' element={ <AllWines /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
