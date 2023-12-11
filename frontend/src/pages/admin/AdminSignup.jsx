// "http://localhost:4000/api/admin/signup",


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    // email: "",
    password: "",
    adminname: "",
    phoneNumber: "",
  });

  const {  password, adminname, phoneNumber } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
"http://localhost:4000/api/adminsignup",
{
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/admindashboard");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show error message)
    }

    setInputValue({
      // email: "",
      password: "",
      adminname: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="adminname">adminname</label>
          <input
            type="text"
            name="adminname"
            value={adminname}
            placeholder="Enter your adminname"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Enter your phone number"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/adminsignin"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminSignup;
