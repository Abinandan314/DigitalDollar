import axios from "axios";

const API_URL = "http://localhost:8080/users/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  };
  
  const login = (username, password) => {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.user.username) {
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem("token",JSON.stringify(response.data.token));
        }

        console.log(response.data.user);
        return response.data.user;
      });
  };
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    return axios.post(API_URL + "signout").then((response) => {
      return response.data;
    });
  };
  
  const AuthService = {
    register,
    login,
    logout
  }

export default AuthService;