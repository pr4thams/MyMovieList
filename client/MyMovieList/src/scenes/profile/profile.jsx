import React from 'react';
import HeaderNav from '../../components/headerNav';
import { Container, Image, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import profileIcon from '../../assets/profileicon.svg';
import { setFriends } from '../../store/auth';
import { Trash } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const user = useSelector(state => state.auth.user);
  const userfriends = useSelector(state => state.auth.friends);
  const options = { month: 'long', day: 'numeric', year: 'numeric' }; 
  const date = user.joined ? user.joined.slice(0, 10) : Date.now.slice(0, 10)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFriend = async(event, email) =>{
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/friends/${user.email}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            friendEmail: email,
          }),
    });
    const remove = await response.json();
    if (remove){
      dispatch(
        setFriends({
          friends: remove.friends,
        })
      );
      navigate('/Profile');
  }; 
};

  return (
    <div className='profile'>
      <HeaderNav/>
      <Container style={{ marginTop: '120px' }}>
        <h1>{user.firstName}'s Profile</h1>
        <hr/>
        <Row>
          <Col sm={3}>
          <Card style={{ width: '19rem' }} className="bg-dark text-white mb-3" >
            <div style={{display: 'flex', justifyContent: 'center'}}>
            {user.picturePath ? (
                  <Card.Img variant='top' src={user.picturePath} style={{ 
                    borderRadius: '50%', marginTop: '10px', height: '250px', width: '250px'
                }}/>
            ) : (
                  <Card.Img src={profileIcon} alt="Profile" style={{ 
                    borderRadius: '50%', marginTop: '10px', height: '250px', width: '250px'
                }}/>
            )}
            
            </div>
            <Card.Body>
              <Row>
                <Col sm={4}>Name:</Col>
                <Col>{user.firstName} {user.lastName}</Col>
              </Row>
              <Row>
                <Col sm={4}>Joined:</Col>
                <Col>{date}</Col>
              </Row>
              
            </Card.Body>
          </Card>
          </Col>
          <Col>
            <h2 style={{color:'white'}}>Bio</h2>
            <p style={{color: 'white'}}>{user.bio}</p>
            <hr/>
            <h2 style={{color:'white'}}>Friends</h2>
            <CardGroup>
            {userfriends.map((friendObj) => (
              <div>
                <Card className='bg-dark text-white me-2' >
                  <Card.Body>
                  {friendObj.picturePath ? (
                  <Card.Img variant='top' src={friendObj.picturePath} style={{ 
                    borderRadius: '50%', marginTop: '10px', height: '150px', width: '150px'
                }}/>
            ) : (
              <Card.Img variant='top' src={profileIcon} style={{ 
                borderRadius: '50%', marginTop: '10px', height: '150px', width: '150px'
            }}/>
            )}
                    <Card.Title>{friendObj.firstName} {friendObj.lastName}</Card.Title>
                    <Card.Text>
                      <Row>
                      Email: {friendObj.email}
                      </Row>
                      <Row>
                      Bio: {friendObj.bio}
                      </Row>
                    </Card.Text>
                    <Button
                          onClick={(event) => removeFriend(event,friendObj.email)}
                          type='submit'
                          size='sm'
                          variant='outline-danger'
                          className='rounded-pill'>
                          <Trash/>
                      </Button>
                  </Card.Body>
                </Card>
                
              </div>
            ))}
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
