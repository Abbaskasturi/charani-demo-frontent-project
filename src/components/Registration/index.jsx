import Cookies from 'js-cookie';
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./index.css";

const Registration = () => { 
  const usenavigate = useNavigate();  
  const [landingpage, setLandingpage] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLogin, setemailLogin] = useState(""); 
  const [passwordLogin, setPasswordLogin] = useState(""); 
  const [msg, setmsg] = useState("");    
  const [loginmsg, setloginmsg] = useState(""); 
  const changelanding = () => {
    setLandingpage((prev) => !prev);
  };

  const onChangeFirstname = (event) => {
    setFirstname(event.target.value);
    setmsg("");
  };

  const onChangeLastname = (event) => {
    setLastname(event.target.value);
    setmsg("");
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    setmsg("");
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setmsg("");
  };
  const onChangeEmailLogin = (event) => {
    setemailLogin(event.target.value);  
    setloginmsg("")
  }
  const onChangePasswordLogin = (event) => {
    setPasswordLogin(event.target.value);  
    setloginmsg("")
  }
  const onSubmitRegister = async (event) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_APP_URL;
    const endpoint = `${apiUrl}/auth/register` 
    const obj = {
      firstName: firstname, 
      lastName: lastname, 
      email: email,
      password: password
    }
    const options ={
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(obj)
    }
    const apiCall = await fetch(endpoint, options); 
    const apiData = await apiCall.json();
    if(apiCall.ok){
      setmsg("Yours Signup Successfully Completed")
    }else{
      setmsg("Right Now Server Facing Some Issue Try Again")
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_APP_URL; 
    const endpoint = `${apiUrl}/auth/login`
    const obj = {
      email: emailLogin,
      password: passwordLogin
    } 
    const options ={
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify(obj)
    }
    const appCall = await fetch(endpoint, options); 
    const appData = await appCall.json();  
    if(appCall.ok){
      Cookies.set("jwt_token", appData.jwtToken, {expires: 1})
      usenavigate('/', {replace: true})

    }else{
      setloginmsg("incorrect password") 
    }
    setemailLogin(""); 
    setPasswordLogin("")
  };
  const jwt_token = Cookies.get("jwt_token"); 
  if(jwt_token){
    return <Navigate to='/'/>
  }
  return (
    <div className="registration-container">
      <div className="register-card">

        {landingpage ? (
          <form className="form-card" onSubmit={onSubmitLogin}>
            <h1 className="registration">Login Infycode</h1>

            <input
              type="email"
              className="input"
              placeholder="Email Id"
              value={emailLogin}
              onChange={onChangeEmailLogin}
              required
            />

            <input
              type="password"
              className="input"
              placeholder="Password"
              value={passwordLogin}
              onChange={onChangePasswordLogin}
              required
            />
            <p className='login-error'>{loginmsg}</p>
            <button className="reg-btn" type="submit">
              Login
            </button>

            <button
              className="have-btn"
              type="button"
              onClick={changelanding}
            >
              Don't Have account? Register
            </button>
          </form>
        ) : (
          <form className="form-card" onSubmit={onSubmitRegister}>
            <h1 className="registration">Registration Infycode</h1>

            <input
              type="text"
              className="input"
              placeholder="Firstname"
              value={firstname}
              onChange={onChangeFirstname}
              required
            />

            <input
              type="text"
              className="input"
              placeholder="Lastname"
              value={lastname}
              onChange={onChangeLastname}
              required
            />

            <input
              type="email"
              className="input"
              placeholder="Email Id"
              value={email}
              onChange={onChangeEmail}
              required
            />

            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              required
            />
            <p className='register-msg'>{msg}</p>
            <button className="reg-btn" type="submit">
              Register
            </button>

            <button
              className="have-btn"
              type="button"
              onClick={changelanding}
            >
              Have account? Login
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Registration;