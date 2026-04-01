import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio.jsx";
import About from "./pages/About.jsx";
import Resume from "./pages/Resume.jsx";
import WebDevProjects from "./pages/WebDevProjects.jsx";
import GameDevProjects from "./pages/GameDevProjects.jsx";
import Contact from "./pages/Contact.jsx";
import GamePage from "./pages/Game.jsx";
import SideNav, { SideNavProvider } from "./components/SideNav.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <SideNavProvider>
        <NavBar />
        <SideNav />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/webdev" element={<WebDevProjects />} />
          <Route path="/gamedev" element={<GameDevProjects />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </SideNavProvider>
    </BrowserRouter>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);