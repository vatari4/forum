import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../auth/Register';
import PostList from '../blog/PostList';
import Login from '../auth/Login';
import PostForm from '../blog/PostForm';


const AppContent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/create-post" element={<PostForm/>} />
      </Routes>
    </div>
  );
};

export default AppContent;
