import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

export default function Login() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <main>
      <div>
        {user ? (
          <Logout onLogout={handleLogout} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </main>
  );
}
