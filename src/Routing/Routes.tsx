import { createBrowserRouter } from "react-router-dom"
import Login from "../Pages/Auth/Login/Login"
import Register from "../Pages/Auth/Register/Register"
import NotFound from "../Pages/NotFound/NotFound"

import Auth from "../Layouts/AuthLayout/Auth"
import Main from "../Layouts/MainLayout/Main"
import Home from "../Pages/Home/Home"
import ChangePass from "../Pages/Auth/changepass/ChangePass"
import Profile from "../Pages/Profile/Profile"
import MainProtected  from "../Components/Gurd/mainProtedcted/MainProtected"
import SinglePostDetails from "../Pages/SinglePost/SinglePostDetails"




export const routes =createBrowserRouter([
   {path:'',element:<Auth/>,errorElement:<NotFound/> ,children:[
    {index:true,element:<Login/>},
    {path:"Register" ,element:<Register/>},
    {path:"changepass",element:<ChangePass/>}
   ]},
     {path:'',element:<MainProtected><Main/></MainProtected>,errorElement:<NotFound/> ,children:[
    {path:'home',element:<Home/>},
    {path:"profile" ,element:<Profile/>},
   {path:"/postDetails/:postId" ,element:<SinglePostDetails/>}


   ]}
],{
  
})
