import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import AdminHome from './AdminHome';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-home" element={<AdminHome />} />
      </Routes>
    </Router>
  );

}
export default App;