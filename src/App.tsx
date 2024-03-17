import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/signIn';
import SingUp from './pages/signUp';
import Home from './pages/home';
import ErrorPage from './pages/errorPage';
import ChatRoom from './pages/chatRoom';
import Navbar from './components/navbar';

const Layout = ({ children }: any) => (
  <>
    <Navbar />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: '/signin',
    element : !localStorage.getItem('user') ? <SignIn /> :  <Layout children={<Home />}/>
  },
  {
    path: '/signup',
    element: !localStorage.getItem('user') ? <SingUp /> :  <Layout children={<Home />}/>
  },
  {
    path: '/',
    element: localStorage.getItem('user') ? <Layout children={<Home />}/> : <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/chatroom/:id',
    element: localStorage.getItem('user') ?  <Layout children={<ChatRoom />}/>: <SignIn />
  },
]);



function App() {
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
