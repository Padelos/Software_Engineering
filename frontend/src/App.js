import React, { useState }  from "react";
import "./index.css";
import Footer from "./components/Footer";
import OurNavbar from "./components/OurNavbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Pricing from "./views/pricingPage";
import About from "./views/aboutPage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";



  
function App() {

  const [value, onChange] = useState(new Date());
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <OurNavbar />
          <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/protected" element={<ProtectedPage />} />
          </Route>
            
            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Pricing/>} path="/pricing" />
            <Route element={<About/>} path="/about" />
            <Route exact element={<Home/>} path="/" />
          </Routes>
          
        </AuthProvider>
        
        <Footer />
        
      </div>
      
    </Router>
    
  );
}

export default App;