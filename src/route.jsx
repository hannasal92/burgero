import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import Home from './components/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import BookTable from './pages/BookTable';
import ErrorPage from './pages/Error';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CartPage from './pages/CartPage';
import Orders from './pages/Order';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/orders",
    element: <PrivateRoute />, // protects child routes
    children: [
      { path: "/orders", element: <Orders /> },
      // add more protected routes here
    ],
  },
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
      { path: '/', element: <Navigate to="/home" replace /> }, // redirects
      { path: '/login', element: <PublicRoute><Login /></PublicRoute>},
      { path: '/signup', element:<PublicRoute><Signup /></PublicRoute> },
      { path: '/cart', element: <CartPage /> },
      { path: '/menu', element: <Menu /> },
      { path: '/about', element: <About /> },
      { path: '/bookTable', element: <BookTable /> },
    ],
  },
]);

export default router;