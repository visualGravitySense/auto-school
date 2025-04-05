import { useState } from 'react'
import './App.css'
import './index.css';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Price from "./pages/Price";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/price" element={<Price />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
