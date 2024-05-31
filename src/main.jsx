import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { AuthLayout, Login } from './components/index.js'
import AddPost from "./pages/AddPost.jsx"
import Signup from "./pages/Signup.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import Home from "./pages/Home.jsx"
import UserProfile from './pages/UserProfile.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import EditProfile from './pages/EditProfile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },

        {
            path: "/edit-profile",
            element: (
               
                    <EditProfile />
            ),
        },
        {
            path: "/profile/:userId",
            element: (
               
                    <UserProfile />
            ),
        },



        
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
