import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import AdminHome from './AdminHome';
import { UserContext } from './UserContext';



function App() {

  const [user, setUser] = useState("");
  const value = useMemo(() => ({ user, setUser }));


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-home" element={<AdminHome />} />
      </Routes>
    </Router>
  );

}
export default App;