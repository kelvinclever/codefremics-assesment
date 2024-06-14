import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./signup.css";
import Lottie from "lottie-react";
import animationData from "../../image/Animation - 1701085886053.json";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";

const SignUpForm = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    userName: yup.string().required("Username is required"),
    mobile: yup.string().required("Mobile is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    termsAndConditions: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Set the createdDate to the current date
    const currentDate = new Date().toISOString();
    data.createdDate = currentDate;
    console.log(data);
    // Perform the POST request with the updated data
    Axios.post("http://localhost:3000/users/new", data)
      .then((response) => {
        response.data.message
          ? alert(response.data.message)
          : alert("account Exist please login");
      })
      .catch(({ response }) => {
        alert(response.data.error);
      });
  };

  return (
    <div className="signup">
      <div id="anime_outer" >
        <Lottie animationData={animationData} className="anime"/>
      </div>
      <div className="signup-Form">
      <p className="title">REGISTER</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            className="input"
            {...register("name")}
          />
          <span>Name</span>
        </label>
        <p>{errors.name?.message}</p>

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
        <p>{errors.userName?.message}</p>

        <label>
          <input
            required=""
            placeholder="kevini@gmail.com"
            type="text"
            className="input"
            {...register("email")}
          />
          <span>Email</span>
        </label>
        <p>{errors.email?.message}</p>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            className="input"
            {...register("mobile")}
          />
          <span>Mobile</span>
        </label>
        <p>{errors.mobile?.message}</p>
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
        <label>
          <input
            type="password"
            name="confirmPassword"
            className="input"
            {...register("confirmPassword")}
          />
          <span>confirmPassword</span>
        </label>
        <p>{errors.confirmPassword?.message}</p>
        <div className="termsAndConditions">
          <input
            type="checkbox"
            name="termsAndConditions"
            {...register("termsAndConditions")}
          />
          <br />
          <label htmlFor="termsAndConditions">
            I agree to the terms and conditions
          </label>
        </div>
        <p>{errors.termsAndConditions?.message}</p>
        <button type="submit" className="buttonsignup">
          Sign up
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>
        <p className="signin">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </form>
      </div>
    </div>
  );
};

export default SignUpForm;
