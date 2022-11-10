import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/LoginForm";
import { Signup } from "./components/SignUpForm";
import AllCheese from "./components/AllCheese";
import AllWines from "./components/AllWines";
import SingleWine from "./components/SingleWine";
import SingleCheese from "./components/SingleCheese";
import Home from "./components/Home";
import Order from "./components/Order";
import Navbar from "./components/Navbar";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <header>
          <Navbar />
        </header>
        <div id="content">
          {isLoggedIn ? (
            <Switch>
              <Route path="/home" component={Home} />
              <Route exact path="/cheeses" component={AllCheese} />
              <Route exact path="/wines" component={AllWines} />
              <Route path="/wines/:id" component={SingleWine} />
              {/* <Route path="/login" component={Login} /> */}
              <Route path="/order" component={Order} />
              <Redirect to="/home" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cheeses" component={AllCheese} />
              <Route exact path="/wines" component={AllWines} />
              <Route path="/wines/:id" component={SingleWine} />
              <Route path="/cheeses/:id" component={SingleCheese} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/order" component={Order} />
            </Switch>
          )}
        </div>
        <footer>
          <p>
            Authors: Jackie Manginelli, Alison Phanthavong, & Anahis Valenzuela
          </p>
          <p>Grace Hopper at FullStack Academy: Grace Shopper Project</p>
        </footer>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
