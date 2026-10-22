"use client";
import { useState } from "react";
const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submiterror, setSubmitEror] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 6) {
      return setSubmitEror("username must be more than 6 characters");
    }
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
        {submiterror && <p>{submiterror}</p>}
      </form>
    </div>
  );
};

export default Page;
