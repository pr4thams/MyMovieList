import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/header';
import { Card, Button, Form, Container } from 'react-bootstrap';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // rename to navigate for clarity

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    if (response.ok) {
      navigate('/');
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container" >
      <Header />
      <Container style={{justifyContent: 'center', display: 'flex', marginTop: '55px'}}>
      <Card className="shadow" style={{ width: '30rem', backgroundColor: '#D3D3D3'}}>
        <Card.Body>
        <h2>Create Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="first_name">
            <Form.Label >First Name</Form.Label>
            <Form.Control type="text" name="firstName" placeholder="Enter your first name" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="last_name">
            <Form.Label >Last Name</Form.Label>
            <Form.Control type="text" name="lastName" placeholder="Enter your last name" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter your Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter your Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </Form.Group>
          <Button type="submit" variant='dark' className="w-100 rounded-pill">Register</Button>
        </Form>
        <hr/>
        <Form.Text>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </Form.Text>
        </Card.Body>
      </Card>
      </Container>
    </div>
  );
}

export default Register;
