import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/client/Home";
import Product from "./pages/client/ProductList";
import Cart from "./pages/client/Cart";
import Signin from "./pages/client/Signin";
import SignUp from "./pages/client/Signup";
import AdminSignUp from "./pages/admin/AdminSignup";
import AdminSignIn from "./pages/admin/AdminSignin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home username="" />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="adminsignup" element={<AdminSignUp />} />
          <Route path="adminsignin" element={<AdminSignIn />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
