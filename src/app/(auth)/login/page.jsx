"use client";
import { useState } from "react";
const page = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSeePassword = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <p>Sign in to access market.</p>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <p onClick={handleSeePassword}>see password </p>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default page;
