import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm setLoggedIn={setLoggedIn} />
        </header>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard setLoggedIn={setLoggedIn} />
      </header>
    </div>
  );
}

export default App;
