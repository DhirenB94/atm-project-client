import React from 'react';
import Map from './components/Map'
import { Route, Switch, NavLink} from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import { loggedin } from "./api";
import Signup from "./components/Signup";
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  // to prevent logging out on refresh
  async componentDidMount() {
    if (this.state.loggedInUser === null) {
      const response = await loggedin();
      if (response.data._id) {
        this.setCurrentUser(response.data);
      }
    }
  }

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <ToastContainer />
        <NavBar
          loggedInUser={loggedInUser}
          setCurrentUser={this.setCurrentUser}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/map" component={Map} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/login"
            render={(props) => {
              return <Login {...props} setCurrentUser={this.setCurrentUser} />;
            }}
          />
          <Route
            exact
            path="/login-google"
            render={() => {
              window.location.href = `${process.env.REACT_APP_PROJECT_API}/api/user/auth/google`;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;