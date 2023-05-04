import { React, useState} from 'react';
import HeaderNav from '../../components/headerNav';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { BookmarkPlus, PersonAdd } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { setFriends } from '../../store/auth';
import profileIcon from '../../assets/profileicon.svg';

function SearchPage() {
    const results = useSelector(state => state.search.results);
    const searchTerm = useSelector(state => state.search.searchTerm);
    const searchType = useSelector(state => state.search.searchType);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const email = user.email;
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState('');
    const [status, setStatus] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
        setShow(false);
    }
    const addToWatchlist = async (event, tconst, primaryTitle, genres, startYear, titleType) => {
        event.preventDefault();
      
          const response = await fetch(`http://localhost:3000/watchlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              movieId: tconst,
              primaryTitle: primaryTitle,
              genres: genres,
              startYear: startYear,
              titleType: titleType,
              userRating: rating,
              Status: status
            }),
          });
          const added = await response.json();
          if (added.message === 'Item Added') {
            setShowAlert(true);
          }
      };
      const addFriend = async (event, email, friendEmail) => {
        event.preventDefault();
          const response = await fetch(`http://localhost:3000/friends/${email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              friendEmail
            }),
          });
          const added = await response.json();
          if (added) {
            dispatch(
                setFriends({
                  friends: added.friends,
                })
              );
          }
      };
      
      

    return (
        <div className='resuts'>
            <Container style={{marginTop: '100px'}}>
                <HeaderNav/>
                {showAlert &&(
                <ToastContainer className="p-3"
                    position='top-center' marginTop='100px'  style={{ 
                        position: 'fixed', 
                        top: '0', 
                        left: '0', 
                        right: '0', 
                        zIndex: '9999',
                        marginBottom: '0',
                        borderRadius: '0',
                      }}
                >
                    <Toast onClose={handleClose}>
                    <Toast.Header>
                        <strong className="me-auto">Success!</strong>
                    </Toast.Header>
                    <Toast.Body>Item added to watchlist</Toast.Body>
                </Toast>
                </ToastContainer>
                )}
                <h1>Search Results for "{searchTerm}"</h1>
                <hr/>
                {searchType === 'users' ? (
                    <div>
                    {results.map(userObj => (
                        <div>
                        <Card key={userObj.id} className="bg-dark text-white">
                            
                            <Card.Body>
                                <Row>
                                    <Col sm={4}>
                                    {userObj.picturePath ? (
                  <Card.Img variant='top' src={userObj.picturePath} style={{ 
                    borderRadius: '50%', marginTop: '10px', height: '150px', width: '150px'
                }}/>
            ) : (
              <Card.Img variant='top' src={profileIcon} style={{ 
                borderRadius: '50%', marginTop: '10px', height: '150px', width: '150px'
            }}/>
            )}
                                    </Col>
                                
                                <Col sm={10}><Card.Title>
                                {userObj.firstName} {userObj.lastName}
                            </Card.Title>
                            
                                </Col>
                                <Col>
                                <Button 
                                    type='submit'
                                    size='md'
                                    variant='warning'
                                    className='rounded-pill'
                                    onClick={(event) => addFriend(event, email, userObj.email)}>
                                    <PersonAdd/> Add Friend
                                </Button>
                                </Col>
                                </Row>
                            <Row>
                            <Card.Text>
                                Email: {userObj.email}
                            </Card.Text>
                            </Row>
                            <Row>
                            <Card.Text>
                                Bio: {userObj.bio}
                            </Card.Text>
                            </Row>
                            </Card.Body>  
                        </Card>
                        <br/>
                        </div>
                        ))}
                    </div>
                ) : (
                    <div>
                    {results.map((titleObjs) => (
                        <div>
                        <Card key={titleObjs.id} className="bg-dark text-white">
                        <Form onSubmit={(event) => addToWatchlist(event, titleObjs.tconst, titleObjs.primaryTitle, titleObjs.genres, titleObjs.startYear, titleObjs.titleType)}>
                        <Card.Body>
                            <Row>
                            <Col><Card.Title>{titleObjs.primaryTitle}</Card.Title></Col>
                            <Col sm={2}>
                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                <Form.Select    
                                    className='rounded-pill' 
                                    name='status'
                                    onChange={(event) => setStatus(event.target.value)}
                                    required>
                                    <option>Select Status</option>
                                    <option value="Watching">Watching</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On-Hold">On-Hold</option>
                                    <option value="Plan to Watch">Plan to Watch</option>
                                    <option value="Dropped">Dropped</option>
                                </Form.Select>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.Controlrating"
                                >
                                <Form.Select 
                                    className='rounded-pill'
                                    name='rating'
                                    onChange={(event) => setRating(event.target.value)} required>
                                    <option>Select Rating</option>
                                    <option value="10">(10) Masterpiece</option>
                                    <option value="9">(9) Great</option>
                                    <option value="8">(8) Very Good</option>
                                    <option value="7">(7) Good</option>
                                    <option value="6">(6) Fine</option>
                                    <option value="5">(5) Average</option>
                                    <option value="4">(4) Bad</option>
                                    <option value="3">(3) Very Bad</option>
                                    <option value="2">(2) Horrible</option>
                                    <option value="1">(1) Appaling</option>
                                </Form.Select>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row>
                            <Col>
                            
                            <Card.Text>
                                Genres: {titleObjs.genres} |
                                Start Year: {titleObjs.startYear} |
                                Type: {titleObjs.titleType}
                            </Card.Text>
                            </Col>
                            <Col sm={1}>
                                <Button 
                                    type='submit'
                                    size='md'
                                    variant='warning'
                                    className='rounded-pill'>
                                    <BookmarkPlus/> Add
                                </Button>
                            </Col>
                            </Row>
                        </Card.Body>
                    </Form>
                        </Card>
                        <br/>
                        </div>
                    ))}
                    </div>
                )}
        </Container>
     </div>
    )  
}
export default SearchPage;