import React from 'react';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import Home from './Pages/Home';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirebaseProvider } from './store/FirebaseContext';
import { AuthProvider } from './store/AuthContext';
import Post from './store/PostContext';





function App() {
  return (
    <Post>
    <FirebaseProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </FirebaseProvider>
    </Post>
  );
}

export default App;
