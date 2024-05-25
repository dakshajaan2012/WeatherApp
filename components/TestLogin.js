

// UserBar

import React, { useState } from "react"; // import useState

function UserBar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    alert("Logged in");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#eee",
        fontSize: 12,
        padding: "10px",
      }}
    >
      <label>Username</label>

      <input type="text" value={username} onChange={handleUserChange} />

      <label>Password</label>
      <input type="password" value={password} onChange={handlePasswordChange} />

      <button
        style={{ width: 100, height: 30, fontSize: 12 }}
        onClick={handleLogin}
      >
        {" "}
        Login
      </button>
    </div>
  );
}

export default UserBar;