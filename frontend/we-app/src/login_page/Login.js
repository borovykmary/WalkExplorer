import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../res/logo-we.svg";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error) {
          setFieldError("email", errorData.error); // Show error on email field
        }
        throw new Error(errorData.error || "Login failed");
      }
      const data = await response.json();
      localStorage.setItem("authToken", data.token); // Store token
      navigate("/main"); // Redirect to main page
    } catch (error) {
      alert(error.message); // Display generic error message
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuest = () => {
    navigate("/main");
  };

  return (
    <div className="app-container">
      <LogoIcon className="logo" />
      <div className="welcome-text">Welcome to Walk Explorer!</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="input-field wide-field"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="input-field wide-field"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div className="button-container">
              <button
                type="submit"
                className="button login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
              <button
                type="button"
                className="button guest-btn"
                onClick={handleGuest}
              >
                Continue as Guest
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="forgot-password-link">
        <p>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </div>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
