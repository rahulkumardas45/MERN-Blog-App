import React, { useState } from 'react'
import logo from "@/assets/images/logo-white.png"
import { Await, Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { MdLogin } from 'react-icons/md';
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteGemini, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName.js';
import { useDispatch, useSelector } from 'react-redux';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
   
}from "@/components/ui/dropdown-menu";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from "@/assets/images/user.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { showToast } from '@/helpers/showtoast.js';
import { removeUser } from '@/redux/user/user.slice.js';
import { getEnv } from '@/helpers/getEnv';
import { IoMdSearch } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { useSidebar } from './ui/sidebar';



function Topbar() {
  const { toggleSidebar } = useSidebar()
  const [showSearch, setshowSearch] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = async()=>{
  try {
       const Response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
        method: "get",
        credentials: "include"
       })

       const data = await Response.json()
       if(!Response.ok){
        return showToast("error", data.message)
       }
     dispatch(removeUser())
     navigate(RouteIndex)
     showToast("success", data.message)


  } catch (error) {
showToast("error", data.message)
    
  }


 }

 const user = useSelector((state)=>{
   return state.user

 })

const toggleSearch =()=>{
    setshowSearch(!showSearch)
}

  return (
    <div className='flex justify-between items-center h-16 fixed md:w-full w-100  z-20 bg-white px-5 border-b '>
         <div className='flex justify-center items-center gap-2'>
          <Button onClick={toggleSidebar } className='md-hidden' type='button'>
          < MdOutlineMenu/>
          </Button>
         <Link to={RouteIndex}>
        <img src={logo} alt="" className='md:w-auto w-100' />
       </Link>
         </div>
       <div className='w-[400px] '>
        <div className={`md:relative absolute md:block  text-center bg-white left-0 md:ml-0 ml-2 w-full md:top-0 top-13 md:p-0 p-5 ${showSearch? 'block' : 'hidden'} `}>

        <SearchBox/>
        </div>
       </div>
       <div className='flex items-center gap-5' >
        <div onClick={toggleSearch} className='md:hidden block'
        >
          <IoMdSearch size='20'/>

        </div>

        <div className='bg-gray-500'>
          <Link  to={RouteGemini}>
           <button className='bg-gray-500'>
            Learn With Gemini
           </button>
        </Link>
        </div>


       {!user.isLoggedIn ?
         <Button asChild className={"rounded-full bg-green-500 text-white hover:bg-green-600"}>
          <Link to={RouteSignIn} className='rounded-full bg-gray'>
          Sign In
          <MdLogin />
          </Link>
         </Button>
         :
       <DropdownMenu>
  <DropdownMenuTrigger className=" cursor-pointer">
    <Avatar>
  <AvatarImage src={user?.user.avatar|| usericon } />
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>
      <p>{user.user.name}</p>
      <p className='text-sm'>{user.user.email}</p>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
     <DropdownMenuItem asChild className="cursor-pointer">
      <Link to={RouteProfile}>
      <FaRegUser/>
      profile
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild className="cursor-pointer">
      <Link to={RouteBlogAdd}>
      < FaPlus/>
      Add Blogs
      </Link>
    </DropdownMenuItem>

 <DropdownMenuSeparator />
   
     <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
      <MdLogout color='red'/>
      <div className='text-red-500'>
       Logout
      </div>
    
      
    </DropdownMenuItem>
     
  
  </DropdownMenuContent>
</DropdownMenu>

       }
       </div>
     
      </div>
  )
}

export default Topbar