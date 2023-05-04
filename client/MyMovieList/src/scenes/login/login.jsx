import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/header'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../store/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUpdate = useSelector(state => state.auth.isUpdated);
  const [show, setShow] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const loggedIn = await response.json();
    if (loggedIn) {
      dispatch(
        setLogin({
            isAuth: true,
            user: loggedIn.user,
            token: loggedIn.token,
            friends: loggedIn.user.friends
        }),
      );
      navigate('/home');
    } else {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <Header />
      {isUpdate && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Alert style={{ maxWidth: '500px' }} show={show} variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Profile Updated!</Alert.Heading>
          <p>You profile was successfully updated. Login to see updated content.</p>
        </Alert>
        </div>
      )}
      <Container style={{justifyContent: 'center', display: 'flex', marginTop: '100px'}}>
      <Card className="shadow" style={{ width: '25rem', backgroundColor: '#D3D3D3'}}>
        <Card.Body>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" id="password" name="password" placeholder="Passowrd" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </Form.Group>
          <Button type="submit" variant='dark' className="w-100 rounded-pill">Login</Button>
          <hr/>
          <Form.Text>
          <p>
              Don't have an account? <Link to="/register">Create Account</Link>
          </p>
          </Form.Text>
          </Form>
          </Card.Body>
      </Card>
      </Container>
    </div>
  );
}

export default Login;
