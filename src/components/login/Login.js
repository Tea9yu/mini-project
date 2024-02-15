import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

export default function Login() {
  const [user, setUser] = useState();

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {user ? (
        <Logout onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
