import { Routes, Route } from 'react-router-dom';
// Pages
import HomePage from './pages/home/HomePage';
import LoginPage from './users/login/LoginPage';
import RegisterPage from './users/register/RegisterPage';
import TestPage from './pages/test/TestPage';
import EditorPage from './pages/editor/EditorPage';
import Error404 from './pages/error/Error404';
// Constants
import {
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
  TEST_PAGE_URL,
  ERROR_404_PAGE_URL,
  SOCKET_PAGE_URL,
} from './utils/Constants';

function App() {
  return (
      <Routes>
        <Route path={HOME_PAGE_URL} index element={<HomePage />} />
        <Route path={LOGIN_PAGE_URL} element={<LoginPage />} />
        <Route path={SOCKET_PAGE_URL} element={<EditorPage />} />
        <Route path={SIGN_UP_PAGE_URL} element={<RegisterPage />} />
        <Route path={TEST_PAGE_URL} element={<TestPage />} />
        <Route path={ERROR_404_PAGE_URL} element={<Error404 />} />
      </Routes>
  );
}

export default App;
