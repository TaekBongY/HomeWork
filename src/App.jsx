import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserRegistration from './pages/UserRegistration';
import Error404 from './pages/Error404';
import Layout from './components/common/Layout';
import PrivateRoute from './components/routers/PrivateRoute';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import UserEdit from './pages/UserEdit';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:dataId" element={<UserDetail />} />
        <Route path="/user/new" element={<UserRegistration />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
