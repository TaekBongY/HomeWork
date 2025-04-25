import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserRegistration from './pages/UserRegistration';
import Error404 from './pages/Error404';
import Layout from './components/common/Layout';
import UsersProvider from './components/context/UserContext';


function App() {
  return (
    <UsersProvider>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/user/new" element={<UserRegistration />} />
      </Route>
      <Route path='*' element={<Error404 />} />
    </Routes>
    </BrowserRouter>
    </UsersProvider>
  )
}

export default App
