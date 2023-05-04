import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import SearchBar from './search';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { BoxArrowRight, Gear, Person, SunFill, BookmarkPlus, PersonCircle } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearSearch } from '../store/search';
import { setWatchlist, clearWatchlist } from '../store/watchlist';
import { useNavigate } from 'react-router-dom';

function HeaderNav() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearSearch());
    dispatch(clearWatchlist());
  };

  const fillWatchlist = async () => {
    const response = await fetch(`http://localhost:3000/watchlist/${user.email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const list = await response.json();
    if (list){
      dispatch(
        setWatchlist({
          watch_list: list.watchlist,
        })
      );
      navigate('/watchlist');
    };
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
      <Navbar.Brand as={Link} to="/home">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="MyMovieList logo"
            />{' '}
        </Navbar.Brand>
      <Nav className="me-auto my-2 my-lg-0">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: 1 }}><SearchBar style={{ width: "100%" }}/></div>
          <Nav.Link>
            <Button variant="outline-info" className='rounded-pill' onClick={fillWatchlist}><BookmarkPlus/> Watchlist</Button>
          </Nav.Link>
          <Dropdown>
            <Dropdown.Toggle variant="outline-info" className='rounded-pill'><PersonCircle/> {user.firstName}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile"><Person/> Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings"><Gear/> Account Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/" onClick={handleLogout}><BoxArrowRight/> Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Nav.Link>
            <Button variant="outline-info" className='rounded-pill'><SunFill/></Button>
          </Nav.Link>
          
          </div>
        </Nav>
        </Container>
      </Navbar>
  );
}

export default HeaderNav;
