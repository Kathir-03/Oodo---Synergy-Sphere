import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
        console.log("API says:", data.message);
      })
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login backendMsg={msg} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
