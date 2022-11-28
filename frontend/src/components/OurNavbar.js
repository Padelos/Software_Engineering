import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
const OurNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/home">Best Parking EU</Navbar.Brand>
      <Nav className="me-auto ">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        {user ? (
          <>
          <Nav.Link href="/protected">Protected Page</Nav.Link>
          </>

        ):
        (<>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </>)}

      </Nav>
      {user?(<>
        <Nav>
            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
        </Nav>
      </>):(<>
      
      </>)}
    </Container>
  </Navbar>

  );
}
export default OurNavbar;

/*
const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
      <div>
        <h1>App Name</h1>
        <div>
          {user ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/protected">Protected Page</Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
*/
