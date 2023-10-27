import React, { useEffect } from 'react';
import './App.css';

import routes from './router';
import { createBrowserRouter, RouterProvider, unstable_HistoryRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import path from 'path';
import SingUp from './pages/sign-up';
import Home from './pages/home';
import ErrorPage from './pages/error-page';
import { useNavigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signin',
    element : localStorage.getItem('user') ? <SignIn /> : <Home />
  },
  {
    path: '/signup',
    element: localStorage.getItem('user') ? <SingUp /> : <Home />
  }

]);



function App() {
  useEffect(() => {
    if(!localStorage.getItem('user'))
      // navigate('/');
      // window.location.reload();
      console.log("No User");
  });

  return (
    <RouterProvider router={router} />
  )
}

export default App;
