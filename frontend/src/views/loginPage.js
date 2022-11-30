import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
    
  };

  return (
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
      Don't you have an account? <a href="/register">Register here</a>
      </Form.Group>
     
    </Form>
        </Card.Body>
      </Card>
      
    </Stack>
  );
};
/**
 * OLD
<section>
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter Username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>
    </section>
 */
export default LoginPage;