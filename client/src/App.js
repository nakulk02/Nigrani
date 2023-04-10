import './App.css';
import { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TextForm from './components/TextForm';
import Home from './components/Home';
import Login from './components/Login';
import {AuthProvider,AuthContext} from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="/about" element={<TextForm />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
