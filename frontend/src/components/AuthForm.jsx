import React, { useState } from "react";
import { login, register } from "../api";

const AuthForm = ({ onAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isLogin ? login : register;
    action({ username, password })
      .then((res) => {
        if (isLogin) {
          localStorage.setItem("token", res.data.token);
          onAuth();
        } else {
          alert("Registered! Please login.");
          setIsLogin(true);
        }
      })
      .catch(() => alert("Error during authentication"));
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-2 border p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-2 border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p
        className="text-center text-sm mt-2 cursor-pointer text-blue-600"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default AuthForm;
