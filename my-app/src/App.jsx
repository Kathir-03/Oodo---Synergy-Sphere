// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import Landing from "./Landing";
// import DashBoard from "./DashBoard";

// function App() {
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/hello/")
//       .then((res) => res.json())
//       .then((data) => {
//         setMsg(data.message);
//         console.log("API says:", data.message);
//       })
//       .catch((err) => console.error("Error fetching API:", err));
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login backendMsg={msg} />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/landing" element={<Landing />} />
//         <Route path="/dashboard" element={<DashBoard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


function App() {
  const baseURL = 'http://127.0.0.1:8000/';

  useEffect(() => {
    // This function will be called when the component mounts
    const getCsrfToken = async () => {
      try {
        // We still need to hit the endpoint to get the cookie set
        await fetch(`${baseURL}/api/auth/csrf/`);
        console.log("CSRF cookie should be set now.");
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    getCsrfToken();
  }, []); // The empty array means this effect runs only once

  const handleLogin = async (e) => {
    e.preventDefault();
    // 1. Get the CSRF token value using our helper function
    const csrfToken = getCookie('csrftoken');

    try {
      const response = await fetch(`${baseURL}/api/auth/login/`, {
        method: 'POST',
        // 2. IMPORTANT: Include credentials to send cookies
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 3. Manually set the X-CSRFToken header
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          username: 'testuser', // Replace with form data
          password: 'testpassword', // Replace with form data
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="App">
      <h1>Login with Fetch</h1>
      <form onSubmit={handleLogin}>
        {/* Your form inputs would go here */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;