import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.username === "admin" && formData.password === "1234") {
      alert("Login successful!");
      navigate("/dashboard"); 
    } else {
      alert("Invalid credentials!");
    }
  }

  return (
    <section>
      {/* Background grid */}
      <div className="grid">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* Login box */}
      <div className="signin">
        <form onSubmit={handleSubmit}>
          <h2>ADMIN LOGIN</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="links">
            <a href="#">Forgot Password?</a>
            <a href="#">Help</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
