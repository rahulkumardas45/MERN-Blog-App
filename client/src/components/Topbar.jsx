import React, { useState } from 'react'
import logo from "@/assets/images/logo-dark.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { MdLogin } from 'react-icons/md';
import SearchBox from './SearchBox';
import { RouteBlog, RouteBlogAdd, RouteIndex, RouteProfile, RouteSearch, RouteSignIn } from '@/helpers/RouteName.js';
import { useDispatch, useSelector } from 'react-redux';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
   
}from "@/components/ui/dropdown-menu";


import { Avatar, AvatarImage } from "@/components/ui/avatar"
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
import { Sparkles } from 'lucide-react';



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
showToast("error", error.message)
    
  }


 }

 const user = useSelector((state)=>{
   return state.user

 })

const toggleSearch =()=>{
    setshowSearch(!showSearch)
}

const navLinkClass = ({ isActive }) =>
  `nav-pill flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'active' : ''}`

  return (
    <div className='glass-panel fixed left-0 right-0 top-0 z-30 border-b border-slate-200/70 bg-white/82 shadow-sm shadow-slate-200/70 backdrop-blur-2xl md:left-64'>
      <div className='flex h-18 min-h-18 w-full items-center gap-3 px-4 sm:px-6'>
         <div className='flex min-w-0 flex-1 items-center gap-3 md:flex-none'>
          <Button onClick={toggleSidebar } className='size-10 rounded-full border border-slate-200/80 bg-white/75 p-0 text-slate-700 shadow-sm hover:border-green-300 hover:bg-emerald-50 hover:text-green-700 md:hidden' type='button'>
          <MdOutlineMenu size={22}/>
          </Button>
         <Link to={RouteIndex} className='ai-brand-mark flex items-center gap-3 rounded-full md:hidden'>
        <img src={logo} alt="Blog app" className='h-9 w-auto' />
       </Link>
       <div className="hidden flex-col leading-tight md:flex">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-500">AI Blog Studio</span>
        <span className="text-sm font-semibold text-slate-500">Modern content workspace</span>
       </div>
         </div>
       <nav className='hidden flex-shrink-0 items-center gap-2 lg:flex'>
        <NavLink to={RouteIndex} className={navLinkClass}>
          <span>Home</span>
        </NavLink>
        {user.isLoggedIn && (
          <NavLink to={RouteBlog} className={navLinkClass}>
            <span>Dashboard</span>
          </NavLink>
        )}
        <NavLink to={RouteSearch()} className={navLinkClass}>
          <Sparkles size={16} />
          <span>Explore</span>
        </NavLink>
       </nav>
       <div className='mx-auto hidden min-w-[220px] max-w-2xl flex-1 md:block'>
        <div className='w-full'>
        <SearchBox/>
        </div>
       </div>
       <div className='flex flex-shrink-0 items-center gap-2 sm:gap-3' >
        <button type="button" onClick={toggleSearch} className='flex size-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/75 p-0 text-slate-700 shadow-sm transition hover:border-green-300 hover:bg-emerald-50 hover:text-green-700 md:hidden'
        >
          <IoMdSearch size='20'/>

        </button>








       {!user.isLoggedIn ?
         <Button asChild className={"h-10 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 px-4 text-sm text-white shadow-lg shadow-green-500/20 hover:from-green-600 hover:to-cyan-600 sm:px-5 sm:text-base"}>
          <Link to={RouteSignIn} className='flex items-center gap-2 rounded-full'>
          <span className="hidden sm:inline">Sign In</span>
          <span className="sm:hidden">Sign</span>
          <MdLogin />
          </Link>
         </Button>
         :
       <DropdownMenu>
  <DropdownMenuTrigger className="rounded-full border border-slate-200/80 bg-white/75 p-1 shadow-sm transition hover:border-green-300 hover:shadow-md">
    <Avatar className="size-9">
  <AvatarImage src={user?.user?.avatar || usericon } />
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="mr-4 mt-2 min-w-56 border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/80 backdrop-blur-xl">
    <DropdownMenuLabel>
      <p>{user?.user?.name}</p>
      <p className='text-sm'>{user?.user?.email}</p>
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
      <div className={`search-panel-mobile border-t border-slate-200/70 bg-white/95 px-4 py-3 shadow-lg shadow-slate-200/70 backdrop-blur-2xl md:hidden ${showSearch ? 'block' : 'hidden'}`}>
        <SearchBox/>
      </div>
    </div>
  )
}

export default Topbar
