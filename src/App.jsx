import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserRegistration from './pages/UserRegistration';
import Error404 from './pages/Error404';
import Layout from './components/common/Layout';
import UsersProvider from './components/context/UserContext';
import PrivateRoute from './components/routers/PrivateRoute';
import { BrowserRouter } from 'react-router-dom';
import MyPage from './pages/MyPage';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <UsersProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<UserList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/user/new" element={<UserRegistration />} />
          <Route path="/mypage" element={
  <PrivateRoute>
    <MyPage />
  </PrivateRoute>
} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </UsersProvider>
    </BrowserRouter>
  );
}

export default App;
