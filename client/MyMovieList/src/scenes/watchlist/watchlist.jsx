import React, { useState } from 'react';
import HeaderNav from '../../components/headerNav';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Container, ListGroup, Col, Row } from 'react-bootstrap';
import profileicon from '../../assets/profileicon.svg'
import { useDispatch } from 'react-redux';
import { setUpdate } from '../../store/auth';
import { setWatchlist } from '../../store/watchlist';
import { Trash } from 'react-bootstrap-icons';
import banner from '../../assets/banner.svg';
import {Image} from 'react-bootstrap';


function Watchlist() {
  const user = useSelector(state => state.auth.user);
  const userwatchlist = useSelector(state => state.watchlist.watch_list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromWatchlist = async(event, movieId) =>{
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/watchlist/${user.email}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            movieId,
          }),
    });
    const remove = await response.json();
    if (remove.message === 'Movie Deleted!'){
      const updatedlist = await fetch(`http://localhost:3000/watchlist/${user.email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const list = await updatedlist.json();
    if (list){
      dispatch(
        setWatchlist({
          watch_list: list.watchlist,
        })
      );
      navigate('/watchlist');
  }}; 
};

  return (
    <div className='Watchlist'>
            <Container style={{marginTop: '100px'}}>
                <HeaderNav/>
                <h1>Your Watchlist</h1>
                <hr/>
                {user.backgroundPath ? (
                  <Image src={user.backgroundPath} fluid/>
            ) : (
                <Image src={banner} fluid />
            )}
                    
                <hr/>
                
                {userwatchlist.map((watchlist) => (
                    <div>
                    <Card key={watchlist.id} className="bg-dark text-white">
                    <Card.Body>
                        <Row>
                        <Col><Card.Title>{watchlist.primaryTitle}</Card.Title></Col>
                        <Col sm={3}>
                        
                        <Card.Text>
                            Status: {watchlist.Status} <br/> Rating: {watchlist.userRating} 
                        </Card.Text>
                        
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                        
                        <Card.Text>
                            Genres: {watchlist.genres} |
                            Start Year: {watchlist.startYear} |
                            Type: {watchlist.titleType}
                        </Card.Text>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={(event) => removeFromWatchlist(event,watchlist.movieId)}
                                type='submit'
                                size='sm'
                                variant='outline-danger'
                                className='rounded-pill'>
                                <Trash/>
                            </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                    <br/>
                    </div>
                ))}
                
            </Container>
        </div>
  );
}

export default Watchlist;
