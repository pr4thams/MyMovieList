import React from 'react';
import logo from '../assets/logo.svg';
import Image from 'react-bootstrap/Image'

function Header() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <header style={{ marginTop: '20px'}}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image src={logo} alt="MyLogo" rounded style={{height: '6rem'}}/>
        </div>
        <h1>MyMovieList</h1>
      </header>
    </div>
  );
}

export default Header;
