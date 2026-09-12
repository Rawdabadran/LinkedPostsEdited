import {  useContext, useState } from "react"

import {  Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contaxt/AuthContext";
import { UserContext } from "../../../Contaxt/UserContext";
import { useQueryClient } from "@tanstack/react-query";


export default function Nav() {

 let [isMobile,setMobile]=useState(false);
 let [userMenue, setUserMenus]=useState(false);

 const userContext = useContext(UserContext);
 const userData = userContext?.userData;



const {name,username,email,photo} = (userData ?? {}) as {
  name?: string;
  username?: string;
  email?: string;
  photo?: string;
};

 
const navgate= useNavigate()

 let OUT = useContext(AuthContext);
 if(!OUT)
 {
  throw Error("this Out must be in contextProvider")
 }

  let {setToken}=OUT;
 
 const query=  useQueryClient()

 function logOut(){
  localStorage.removeItem("token");
  navgate("")
   setToken(null);
   query.removeQueries({queryKey:["userdata"]})

 }

  return (
<div>
<nav className="bg-gray-50  relative w-full top-0  border-b border-default">
  <div className=" lg:w-2/3 w-full flex flex-wrap items-center justify-between mx-auto p-2">
  <Link to ="home" className="flex items-center space-x-3 rtl:space-x-reverse">
     
      <span className="self-center text-2xl text-heading font-bold text-sky-800 whitespace-nowrap">Linked Posts</span>
  </Link>
 <div className="navCintent flex justify-end ">
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
      <button onClick={()=>{setUserMenus(!userMenue)}} type="button"   className="md:flex hidden text-sm bg-neutral-primary rounded-full md:me-0 focus:border-2  focus:border-sky-400 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full " src={photo} alt="user photo" />
      </button>
   
      <div className={`z-50  absolute lg:right-45 right-1 top-full bg-neutral-primary-medium border border-default-medium ${userMenue? 'block' :'hidden'} rounded-base shadow-lg w-44`} id="user-dropdown">
        <div className="px-4 py-3 text-sm border-b border-default">
          <span className="block text-heading  text-gray-800 font-medium">{username}</span>
          <span className="block text-body truncate text-gray-600">{email}</span>
        </div>
        <ul className="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
          <li>
            <Link  to={'/profile'} className="text-gray-600 inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Profile</Link>
          </li>
           <li>
  <Link to="changepass"><span  className=" text-start text-sm  text-stone-600 no-underline hover:no-underline"> change password </span></Link>  

      </li>
          <li>
            <a  href= " " onClick={()=>{logOut()}} className="inline-flex  items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading text-red-600 rounded">Sign out</a>
          </li>
        </ul>
      </div>
      <button data-collapse-toggle="navbar-user" type="button" onClick={()=>{
        setMobile(!isMobile);

      }} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-user" aria-expanded={isMobile}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor"  stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
      </button>
  </div>
  <div className="items-center justify-between  w-full md:flex md:w-auto md:order-1 mx-8" id="navbar-user">
      <ul className={`font-medium flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary md:flex ${isMobile ? 'flex' : 'hidden'}`} >
      <li>
        <Link to={'/home'} className="block py-2 px-3 text-gray-500  text-sm  font-medium bg-brand rounded md:bg-transparent  md:p-0" aria-current="page">Home</Link>
      </li>
      
     
      <li>
        <Link to={'/profile'} className="block py-2 px-3  text-gray-500  text-sm font-medium rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0  md:p-0 md:dark:hover:bg-transparent">ProFile</Link>
      </li>
 
    </ul>
  </div>
 </div>
  </div>
</nav>
</div>
  )
}
