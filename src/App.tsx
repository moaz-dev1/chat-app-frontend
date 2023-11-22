import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/sign-in';
import SingUp from './pages/sign-up';
import Home from './pages/home';
import ErrorPage from './pages/error-page';


const router = createBrowserRouter([
  {
    path: '/',
    element: localStorage.getItem('user') ? <Home /> : <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signin',
    element : !localStorage.getItem('user') ? <SignIn /> : <Home />
  },
  {
    path: '/signup',
    element: !localStorage.getItem('user') ? <SingUp /> : <Home />
  }

]);



function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
