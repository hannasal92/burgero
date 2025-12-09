import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import Home from './components/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import BookTable from './pages/BookTable';
import ErrorPage from './pages/Error';
import Login from './pages/Login';

const router = createBrowserRouter([
  // Login is outside RootLayout
  {
    path: '/home',
    element: <Home />,
  },

  // Everything else uses RootLayout
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/menue', element: <Menu /> },
      { path: '/about', element: <About /> },
      { path: '/bookTable', element: <BookTable /> },
    ],
  },
]);

export default router;