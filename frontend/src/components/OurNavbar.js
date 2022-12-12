import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
export default function OurNavbar() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">ParkingApp</Navbar.Brand>
      <Nav className="me-auto ">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/pricing">Pricing</Nav.Link>
        
        {user ? (
          <>
          <Nav.Link href="/booking">Book Now</Nav.Link>
          <Nav.Link href="/myReservations">Reservations</Nav.Link>
          {user.is_staff ? (<>
          <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users">All Users</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                All reservations
              </NavDropdown.Item>
              
            </NavDropdown>
        </>):(<></>)}
          </>

        ):
        (<>
          
        </>)}
        
      </Nav>
      {user?(<>
        <Nav>
            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
        </Nav>
      </>):(<>
        <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </>)}
    </Container>
  </Navbar>

  );
}
