import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import UserList from './pages/UserList'
import UserDetail from './pages/UserDetail'
import UserRegistration from './pages/UserRegistration'
import Error404 from './pages/Error404'
import Layout from './components/common/Layout'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
