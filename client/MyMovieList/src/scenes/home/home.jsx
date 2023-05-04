
import React, { useEffect, useState } from "react";
import HeaderNav from '../../components/headerNav';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShieldFillExclamation } from 'react-bootstrap-icons';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import MovieList from "../../components/movieList/movieList";

function Home() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.user);
  const searchResults = useSelector(state => state.search.results);
  const searchTerm = useSelector(state => state.search.searchTerm);

  if (!isAuth) { 
    return (
      <Alert variant="danger">
        <Alert.Heading><ShieldFillExclamation/> Oops, Looks Like You Are Not Logged In!</Alert.Heading>
        <p>
             Please <Link to='/'>Login here</Link> to view this page. 
        </p>
      </Alert>
    );
  }


  return (
    <div>
      <HeaderNav/>
      <Container style={{ marginTop: '150px' }}>
      <h1>Welcome! {user.firstName} {user.lastName},</h1>
      <h4 style={{color: '#6c757d'}}>
        Keep track of your favorite movies and TV shows with ease. Check out our features, including search functionality, adding movies to your watchlist, and rating movies you've watched. Don't forget to join the discussion on our discussion page! Happy watching!
      </h4>
      </Container>
      <MovieList />
      <MovieList type="top_rated" />
      <MovieList type="upcoming" />

    </div>
  );
}

export default Home;
