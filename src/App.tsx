import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/signIn';
import SingUp from './pages/signUp';
import Home from './pages/home';
import ErrorPage from './pages/errorPage';
import ChatRoom from './pages/chatRoom';
import ChatTest from './pages/chat-test';

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
  },
  {
    path: '/chatroom/:id',
    element: localStorage.getItem('user') ? <ChatRoom /> : <SignIn />
  },

  {
    path: '/chat-test',
    element: <ChatTest />
  }

]);



function App() {
  // localStorage.removeItem('user');
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
