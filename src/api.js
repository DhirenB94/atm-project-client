import axios from "axios";
const baseUrl = `${process.env.REACT_APP_PROJECT_API}/api`;


export const signup = (username, email, password) => {
    return axios.post(`${baseUrl}/user/signup`, {username, email, password})
  }
export const login = (username, password) => {
    return axios.post(`${baseUrl}/user/login`, {username, password}, { withCredentials: true})
  }

  export const loggedin = () => {
    return axios.get(`${baseUrl}/user/loggedin`, {withCredentials: true});
  }

  export const logout = () => {
    return axios.post(`${baseUrl}/user/logout`, null, {withCredentials: true});
  }

  export const getPins = () => {
    return axios.get(`${baseUrl}/pins`);
  };

  export const addPin = (newPin) => {
    return axios.post(`${baseUrl}/pins`, newPin, {withCredentials: true});
  }; 
  