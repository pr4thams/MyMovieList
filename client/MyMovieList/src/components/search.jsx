import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { setSearch, clearSearch } from '../store/search';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [primaryTitle, setPrimaryTtile] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('Title');

  const handleSearch = async(event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/search/${primaryTitle}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const searchResults = await response.json();
    console.log(searchResults);
    if (searchResults) {
      dispatch(
        setSearch({
            searchTerm: primaryTitle,
            results: searchResults.titleObjs,
            searchtype: searchType
        })
      );
      navigate('/search');
  };
}

const handleUserSearch = async(event) => {
  event.preventDefault();
  const response = await fetch(`http://localhost:3000/search/user/${primaryTitle}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  });
  const userResults = await response.json();
  console.log(userResults);
  if (userResults) {
    dispatch(
      setSearch({
          searchTerm: primaryTitle,
          results: userResults.userObjs,
          searchtype: searchType
      })
    );
    navigate('/search');
};
}

  return (
        <Form className="d-flex" onSubmit={searchType === 'users' ? handleUserSearch : handleSearch}>
            <Form.Select
              onChange={(event) => setSearchType(event.target.value)}
              className='me-1 rounded-pill' style={{width:'6rem'}}>
              <option value='Titles'>Titles</option>
              <option value='users'>Users</option>
            </Form.Select>
            <Form.Control
                type="search"
                name='primaryTitle'
                placeholder="Search MyMovieList"
                className="me-1 rounded-pill"
                aria-label="Search"
                value={primaryTitle}
                onChange={(event) => setPrimaryTtile(event.target.value)}
                style={{width: '20rem'}}
                required
              />
              <Button variant="outline-success" type='submit' className='rounded-pill'><Search/></Button>
    </Form>
  );
}

export default SearchBar;