import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './scenes/login/login';
import Register from './scenes/register/register';
import Home from './scenes/home/home';
import Profile from './scenes/profile/profile';
import Watchlist from './scenes/watchlist/watchlist';
import Settings from './scenes/settings/settings';
import SearchPage from './scenes/search/search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/watchlist' element={<Watchlist />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/search' element={<SearchPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
