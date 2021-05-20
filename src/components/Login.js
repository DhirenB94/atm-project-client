import React from "react";
import { NavLink } from "react-router-dom";
import { login } from "../api";
import {toast} from 'react-toastify';
import './login.css'

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
x
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const response = await login(username, password);
    this.props.setCurrentUser(response.data);
    toast.success('Logged In');
    this.props.history.push("/map");
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={username}
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
          <button className="login-btn">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;











// import { Cancel, Room } from "@material-ui/icons";
// import axios from "axios";
// import { useRef, useState } from "react";
// import "./login.css";

// export default function Login({ setShowLogin, myStorage, setCurrentUser }) {
//   const [error, setError] = useState(false);
//   const usernameRef = useRef();
//   const passwordRef = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = {
//       username: usernameRef.current.value,
//       password: passwordRef.current.value,
//     };

//     try {
//       const res = await axios.post("/user/login", user);
//       myStorage.setItem("user", res.data.username);
//       setCurrentUser(res.data.username)
//       setShowLogin(false);
//     } catch (err) {
//       setError(true);
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <div className="logo">
//         <Room className="logoIcon" />
//         <span>LamaPin</span>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input autoFocus placeholder="username" ref={usernameRef} />
//         <input
//           type="password"
//           min="6"
//           placeholder="password"
//           ref={passwordRef}
//         />
//         <button className="loginBtn" type="submit">
//           Login
//         </button>
//         {error && <span className="failure">Something went wrong!</span>}
//       </form>
//       <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
//     </div>
//   );
// }
