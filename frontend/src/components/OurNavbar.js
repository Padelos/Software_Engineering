import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle } from "react-bootstrap-icons";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap"; 
import { Book } from "react-bootstrap-icons";
import { JournalCheck } from "react-bootstrap-icons";
import { People } from "react-bootstrap-icons";
export default function OurNavbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navDropdownTitle = (<span><PersonCircle size={20} style={{marginRight:"5px"}}></PersonCircle>Profile</span>);
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
          
          
          </>

        ):
        (<>
          
        </>)}
        
      </Nav>
      {user?(<>
        
        <Nav>
        <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="/profile"><b>{user.username}</b></NavDropdown.Item>
              <Dropdown.Divider />
              <NavDropdown.Item style={{pointerEvents:"none"}} className="text-center"><b>User Panel</b></NavDropdown.Item>
              <NavDropdown.Item href="/myReservations"><Book style={{marginRight:"5px" ,fontWeight:"bold"}}></Book>Reservations  </NavDropdown.Item>
              <Dropdown.Divider />

              {user.is_staff ? (<>
              <NavDropdown.Item style={{pointerEvents:"none"}} className="text-center"><b>Admin</b></NavDropdown.Item>
              <NavDropdown.Item href="/users"><People style={{marginRight:"5px",fontWeight:"bold"}}></People>All Users</NavDropdown.Item>
              <NavDropdown.Item href="/allreservations">
                <JournalCheck style={{marginRight:"5px",fontWeight:"bold"}}></JournalCheck>
                All reservations
              </NavDropdown.Item>
              <Dropdown.Divider />
              </>):(<></>)}

              <NavDropdown.Item onClick={logoutUser}>
                <BoxArrowRight style={{marginRight:"5px" ,fontWeight:"bold"}}></BoxArrowRight><b>Logout </b> 
              </NavDropdown.Item>
              
        
        </NavDropdown>
            
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
//<Nav.Link onClick={logoutUser}>Logout</Nav.Link>