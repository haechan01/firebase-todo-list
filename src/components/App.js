import Signup from "./Signup";
import React from 'react';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from './Login'
import Todo from "./Todo";

function App() {
  return (
    <AuthProvider>
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div key="uniqueId1" className="w-100" style={{ maxWidth: '400px' }}>
          
          <Router>
              <Routes>
                <Route exact path="/" element={ <Dashboard/> }></Route>
                <Route path="/signup" element={ <Signup/>} ></Route>
                <Route path="/login" element={ <Login/> } ></Route>
                <Route path="/todo" element={ <Todo/> } ></Route>
              </Routes>
          </Router>
        </div>
      </Container>
    </AuthProvider>
      
    
    
  ) 
}

export default App;