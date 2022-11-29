import React, { useState }  from "react";
import "./index.css";
import Footer from "./components/Footer";
import OurNavbar from "./components/OurNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Pricing from "./views/pricingPage";
import About from "./views/aboutPage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";

//import Example from "./components/Example"
import ContactForm from "./components/ContactForm";
function App() {
  
  const [value, onChange] = useState(new Date());
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <OurNavbar />
          <Switch>
            <PrivateRoute component={ProtectedPage} path="/protected" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Pricing} path="/pricing" />
            <Route component={About} path="/about" />
            <Route exact component={Home} path="/" />
          </Switch>
          
        </AuthProvider>
        
        <Footer />
        
      </div>
      
    </Router>
    
  );
}

export default App;