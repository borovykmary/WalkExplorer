import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import { ReactComponent as LogoIcon } from "../res/logo-we.svg";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should contain at least 8 symbols")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (data.success) {
          alert("Registration successful!");
        } else {
          alert(data.message || "Registration failed.");
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="app-container">
      <LogoIcon className="logo" />
      <h2 className="welcome-text">Welcome to Walker Explorer</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          className="input-field"
          placeholder="Enter your email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="input-helper-text">{formik.errors.email}</div>
        ) : null}

        <input
          type="password"
          className="input-field"
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="input-helper-text">{formik.errors.password}</div>
        ) : null}

        <input
          type="password"
          className="input-field"
          placeholder="Repeat your password"
          {...formik.getFieldProps("repeatPassword")}
        />
        {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
          <div className="input-helper-text">
            {formik.errors.repeatPassword}
          </div>
        ) : null}

        <button type="submit" className="button login-btn">
          Sign Up
        </button>
      </form>

      <div className="register-link">
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
