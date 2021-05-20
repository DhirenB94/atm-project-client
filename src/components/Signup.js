import React from "react";
import { NavLink } from "react-router-dom";
import { signup } from "../api";
import {toast} from 'react-toastify';
import './signup.css'

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    await signup(username, email, password);
    toast.success('Signup succcessful, please Log In')
    this.props.history.push("/login");
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={username}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={email}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={password}
            required
          />
          <button className="signup-btn">Signup</button>
        </form>
      </>
    );
  }
}

export default Signup;
