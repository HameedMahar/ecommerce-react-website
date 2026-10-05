import { useContext, useState } from "react"
import { set, useForm } from "react-hook-form";
import {AuthContext} from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode,setMode]=useState("login");
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm()
  const {signUp, user, logout,login}=useContext(AuthContext)
  
  function onSubmit(data){
    setError(null); 
    let result;
    if(mode==="signup"){
      result = signUp(data.email, data.password);
    }else{
      result = login(data.email, data.password);
    }
    console.log(result.message);
    if (!result.success) {
      setError(result.message);
    }else{
      navigate("/");
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User loged in: {user.email}</p>}
          <button onClick={logout}>Log Out</button>
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div>
              <label className="form-label" htmlFor="email" >Email</label>
              <input className="form-input" type="email" id="email" {...register("email", { required: "Email is required" })}/>
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
             <div>
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-input" type="password" id="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }, maxLength: { value: 100, message: "Password must be at most 100 characters" } })}/>
            {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-large">{mode === "signup" ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div className="auth-switch">{mode === "signup" ? (
            <p>Already have an account?<span className="auth-link" onClick={() => setMode("login")}>Log in</span></p>
          ) : (
            <p>Don't have an account?<span className="auth-link" onClick={() => setMode("signup")}>Sign up</span></p>
          )} </div>
        </div>
      </div>
    </div>
  )
}