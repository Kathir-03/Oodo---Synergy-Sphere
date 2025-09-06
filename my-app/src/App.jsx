import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [msg, setMsg] = useState(0)
   useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then(res => res.json())
      .then(data => {setMsg(data.message); console.log(data.message)})
      .catch(err => console.error("Error:", err));
  }, []);
  return (
    <>
      {msg}
    </>
  )
}

export default App;