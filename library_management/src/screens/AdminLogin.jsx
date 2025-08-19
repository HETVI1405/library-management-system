import React, { useState } from "react";
import "./AdminLogin.css";


export default function AdminLogin({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.username === "lms2025@gmail.com" && formData.password === "123456") {
      onLogin(); 
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <section>
      <div className="grid">
        {Array.from({ length: 60 }).map((i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="signin">
        <form onSubmit={handleSubmit}>
          <h2>SIGN IN</h2>
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

          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
