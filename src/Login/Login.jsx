import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./userSlice.jsx"; 
import Lottie from "lottie-react";
import animationData from "../../image/Animation - 1701085838665.json";
import '../account/signup.css';
import Loader from "../Loader.jsx";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div>
      {loading && <div className="loader-login"><Loader /></div>}
      {success && (
        <div className="loader-login">
          {success}
          {navigate("/")}
        </div>
      )}
      <div className="login">
        <div id="anime_outer">
          <Lottie animationData={animationData} className="anime" />
        </div>
        <div className="signup-Form">
          <p className="title">LOGIN</p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className="input"
                {...register("userName")}
              />
              <span>Username</span>
            </label>
            <label>
              <input
                type="password"
                name="password"
                className="input"
                {...register("password")}
              />
              <span>password</span>
            </label>
            <p>{errors.password?.message}</p>
            <button type="submit" className="buttonsignup">
              {loading ? 'loading...' : (
                <div className="arrow-wrapper">
                  Login
                  <div>
                    <div className="arrow"></div>
                  </div>
                </div>
              )}
            </button>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <p className="signin">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
