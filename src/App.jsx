import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Chatbox from "./components/Chatbox.jsx";
import ProfileEditor from "./components/ProfileEditor.jsx";
import FriendEditor from "./components/FriendEditor.jsx";
import AddFriend from './components/AddFriend.jsx';

function App() {
    const router = createBrowserRouter([
        {
            path: '/dashboard',
            element: <Dashboard/>,
        },
        {
            path:'/login',
            element: <Login/>
        },
        {
            path:'/chat/:id',
            element: <Chatbox/>
        },
        {
            path:'/profile',
            element: <ProfileEditor/>
        },
        {
            path:'/friend/:id',
            element: <FriendEditor/>
        },
        {
            path: "/add",
            element: <AddFriend/>
        },
        {
            path: "/",
            element:<Login/>
        }
    ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
