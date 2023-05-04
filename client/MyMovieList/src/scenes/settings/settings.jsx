import React, { useState } from 'react';
import HeaderNav from '../../components/headerNav';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Container, ListGroup, Col, Row } from 'react-bootstrap';
import profileicon from '../../assets/profileicon.svg'
import { useDispatch } from 'react-redux';
import { setUpdate } from '../../store/auth';

function Settings() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setbio] = useState('');
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isDisabled = newPassword !== confirmPassword;
    const [profilePath, setProfile] = useState(null);
    const [backgroundPath, setBackground] = useState(null);
    
    const updateUser = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3000/users/${user.email}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                bio: bio
            }),
        });
        const updatedUser = await response.json();
        if (updatedUser) {
            dispatch(setUpdate());
        navigate('/');
        }
    };
    const updatePictures = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", profilePath);
        const response = await fetch(`http://localhost:3000/users/picture/${user.email}`,{
            method: 'PUT',
            body: formData
        });
        const updatedUser = await response.json();
        if (updatedUser) {
            dispatch(setUpdate());
        navigate('/');
        }
    };
    const updateBackground = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", backgroundPath);
        const response = await fetch(`http://localhost:3000/users/background/${user.email}`,{
            method: 'PUT',
            body: formData
        });
        const updatedUser = await response.json();
        if (updatedUser) {
            dispatch(setUpdate());
        navigate('/');
        }
    };

    const updatePass = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3000/users/update/${user.email}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: newPassword
            }),
        });
        const updatedUser = await response.json();
        if (updatedUser) {
            dispatch(setUpdate());
            navigate('/')
        };
    };

    return (
        <div className='settings'>
            <HeaderNav/>
            <Container style={{ marginTop: '100px' }}>
                <h1>Settings</h1>
                <hr/>
                <h4 style={{color: 'white'}}>Profile Picture</h4>
                <Card className="bg-dark text-white">
                <div className="d-flex align-items-center">
                {user.picturePath ? (
                  <Card.Img variant='top' src={user.picturePath} style={{ 
                    borderRadius: '50%', width: '90px', height: '90px', 
                    marginLeft: '15px' , marginTop: '15px', marginBottom: '15px'
                }}/>
            ) : (
                <Card.Img
                variant="top"
                src={profileicon}
                alt="your-image"
                style={{ 
                    borderRadius: '50%', width: '90px', height: '90px', 
                    marginLeft: '15px' , marginTop: '15px', marginBottom: '15px'
                }}
        />
            )}
                
                    <Form onSubmit={updatePictures} enctype="multipart/form-data">
                        <Card.Body className="d-flex flex-column justify-content-center">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type='file' style={{width:'15rem'}} name='file'
                             onChange={(event) => setProfile(event.target.files[0])}/>
                        </Form.Group>
                        <Button type='submit' variant='secondary' style={{ width: '5rem' }}>
                            Upload
                        </Button>
                        <Card.Text>Must be JPEG, PNG and cannot exceed 10MB.</Card.Text>
                    </Card.Body>
                    </Form>
                </div>
                </Card>
                <hr/>
                <h4 style={{color: 'white'}}>Watchlist Background Picture</h4>
                <Card className="bg-dark text-white">
                <div className="d-flex align-items-center">
                
                    <Form onSubmit={updateBackground} enctype="multipart/form-data">
                        <Card.Body className="d-flex flex-column justify-content-center">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type='file' style={{width:'15rem'}} name='file'
                             onChange={(event) => setBackground(event.target.files[0])}/>
                        </Form.Group>
                        <Button type='submit' variant='secondary' style={{ width: '5rem' }}>
                            Upload
                        </Button>
                        <Card.Text>Must be JPEG, PNG and cannot exceed 10MB.</Card.Text>
                    </Card.Body>
                    </Form>
                </div>
                </Card>
                <hr/>

                <h4 style={{color: 'white'}}>Profile Settings</h4>
                <p style={{color: '#adadb8'}}>Change identifying details for your account</p>
                <Card className="bg-dark text-white">
                    <Form onSubmit={updateUser}>
                        <ListGroup>
                            <ListGroup.Item style={{backgroundColor: '#343a40', color: 'white'}}>
                            <Form.Group className="mb-3">
                                <Row>
                                <Col sm={2}><Form.Label >First Name</Form.Label></Col>
                                <Col><Form.Control type="text" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Update your first name"/></Col>
                                </Row>
                            </Form.Group>
                            </ListGroup.Item >
                            <ListGroup.Item style={{backgroundColor: '#343a40', color: 'white'}}>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col sm={2}><Form.Label >Last Name</Form.Label></Col>
                                    <Col><Form.Control type="text" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Update your last name"/></Col>
                                </Row>
                            </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor: '#343a40', color: 'white'}}>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col sm={2}><Form.Label >Email</Form.Label></Col>
                                    <Col><Form.Control type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Update your email"/></Col>
                                </Row>
                            </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor: '#343a40', color: 'white'}}>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col sm={2}><Form.Label >Bio</Form.Label></Col>
                                    <Col>
                                        <Form.Control type="text" name="bio" value={bio} onChange={(event) => setbio(event.target.value)} required/>
                                        <Form.Text>  
                                         Description for the About panel on your channel page in under 300 characters
                                        </Form.Text>
                                    </Col> 
                                </Row>
                            </Form.Group>
                            </ListGroup.Item>
                    </ListGroup>
                    <Card.Footer className="text-muted d-flex">
                        <div className="ml-auto">
                            <Button variant='secondary' type='submit'>Save Changes</Button>
                        </div>
                    </Card.Footer>
                    </Form>
                </Card>
                <hr/>

                <h4 style={{color: 'white'}}>Security</h4>
                <p style={{color: '#adadb8'}}>Keep your account safe and sound</p>
                <Card className="bg-dark text-white">
                    <Form onSubmit={updatePass}>
                        <ListGroup>
                            <ListGroup.Item style={{backgroundColor: '#343a40', color: 'white'}}>
                                <Row>
                                    <Col sm={2}>
                                        <Card.Title>Change Password</Card.Title>
                                    </Col>
                                    <Col>
                            <Form.Group className="mb-3" controlId="newPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" name="newPassword" value={newPassword} placeholder="Enter Your New Password" onChange={(e) => setNewPassword(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group  controlId="confirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" value={confirmPassword} name="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required/>        
                            </Form.Group>
                            <Form.Text>  
                                            Improve your security with a strong password.
                                        </Form.Text>
                                    </Col> 
                                </Row>
                            </ListGroup.Item>
                    </ListGroup>
                    <Card.Footer className="text-muted d-flex">
                        <div className="ml-auto">
                            <Button variant='secondary' type='submit' disabled={isDisabled}>Change Password</Button>
                        </div>
                    </Card.Footer>
                    </Form>
                </Card>
            </Container>
            <hr/>
        </div>
    )
};

export default Settings;