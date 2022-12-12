import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <section>
      <Stack className="col-md-5 mx-auto py-4">
      <Card style={{borderRadius: "0px"}}>
        <Card.Body>
        <Form onSubmit={handleSubmit}>

      <Form.Group controlId="username" className="mb-3" >
        <Form.Label >Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="confirm-password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e => setPassword2(e.target.value)} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
      Submit
      </Button>
     
    </Form>
        </Card.Body>
      </Card>
      
    </Stack>
      
    </section>
  );
}

export default Register;

/**
 <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </div>
        <button>Register</button>
      </form>
<Stack className="col-md-5 mx-auto py-4">
      <Card style={{borderRadius: "0px"}}>
        <Card.Body>
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username" className="mb-3" >
        <Form.Label >Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Form.Group className="mb-3 text-center">
      Don't have an account? <a href="/register">Register here!</a>
      </Form.Group>
     
    </Form>
        </Card.Body>
      </Card>
      
    </Stack>
 */