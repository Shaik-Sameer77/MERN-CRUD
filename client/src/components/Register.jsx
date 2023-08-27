import React, { useEffect, useState } from "react";
import { register } from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.jsx";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate()

  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const user=localStorage.getItem('user');
    if(user){
      return navigate('/')
    }
  }, [])
  

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
      const result = await register(form);
      console.log('form',result);
      setErrors(null);
      
      if(result.status===200){
        if(result.data.status===201){
          setErrors(result.data.data);
          toast(result.data.message);
          return;
        }

        if(result.data.status===202){
          setErrors(result.data.data);
          toast(result.data.message);
          return;
        }
        

        if(result.data.status===200){
          localStorage.setItem("user",JSON.stringify(result.data.data));
          navigate("/")
          return;
        }
      }else{
        toast("Something went worng, please try again");
      }
  }
  

  return (
    <>
    <Header/>
    <div className="container">
      <ToastContainer/>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-5 card border-primary mt-4">
          <div className="card-header h4 text-center">
            Register Your Account
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="col-form-label mt-4" htmlFor="Name">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                id="Name"
                placeholder="Enter your Full Name here..."
                className="form-control"
              />
               {errors?.name && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.name.msg}
                </small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label mt-4" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                id="username"
                placeholder="Enter your username here..."
                className="form-control"
              />
               {errors?.username && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.username.msg}
                </small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label mt-4" htmlFor="Email">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                id="Email"
                placeholder="Enter your Email here..."
                className="form-control"
              />
               {errors?.email && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.email.msg}
                </small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label mt-4" htmlFor="Password">
                Password
              </label>
              <input
                type="Password"
                name="password"
                onChange={handleInputChange}
                id="Password"
                placeholder="Enter your Password here..."
                className="form-control"
              />
               {errors?.password && (
                <small id="emailHelp" className="form-text text-danger">
                  {errors.password.msg}
                </small>
              )}
            </div>
            <div className="row justify-content-center form-group mt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-outline-secondary col-sm-6"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
