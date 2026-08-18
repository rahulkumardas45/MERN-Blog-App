import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupLabel
} from "@/components/ui/sidebar"
import { Link, NavLink, useLocation } from "react-router-dom"
import logo from "@/assets/images/logo-dark.png"
import { AiOutlineHome } from 'react-icons/ai';
import { TbCategory2 } from 'react-icons/tb';
import { LiaBlogSolid } from 'react-icons/lia';
import { FaRegComments } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { BiRadioCircle } from 'react-icons/bi';
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUserDetails } from "@/helpers/RouteName.js";
import { useFetch } from "@/hooks/useFetch.js";
import { getEnv } from "@/helpers/getEnv.js";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

const AppSidebar = () => {

  const user = useSelector(state => state.user);
  const location = useLocation();
  
   const {data: categoryData}= useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: 'GET',
      Credentials: 'include'
      
    })

    

  return (
     <Sidebar className="border-r border-slate-200/70 bg-white/90 shadow-xl shadow-slate-200/70 backdrop-blur-2xl" collapsible="offcanvas">
      <SidebarHeader className="border-b border-slate-200/70 bg-white/80 p-5 backdrop-blur-xl">
        <Link to={RouteIndex} className="ai-brand-mark flex items-center gap-3">
          <img src={logo} width= {126} alt="Blog app" />
        </Link>
        <div className="mt-4 rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/95 via-white/90 to-sky-50/95 p-4 text-sm text-slate-700 shadow-lg shadow-emerald-100/60">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Sparkles size={16} className="text-green-500" />
            AI Blog Studio
          </div>
          <p className="mt-1 text-xs text-slate-500">Create, manage, and explore stories.</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white/82 px-3 py-5 backdrop-blur-xl">
        <SidebarGroup className="gap-2">
          <SidebarGroupLabel className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
           Workspace
          </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
                <SidebarMenuItem >
                    <SidebarMenuButton asChild isActive={location.pathname === RouteIndex} tooltip="Home" className="sidebar-link rounded-xl px-3">
                   <NavLink to={RouteIndex} >
                       <AiOutlineHome />
                        <span>Home</span>
                    </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                {user && user.isLoggedIn ?
                <>
                <SidebarMenuItem >
                    <SidebarMenuButton asChild isActive={location.pathname === RouteBlog} tooltip="Blogs" className="sidebar-link rounded-xl px-3">
                  <NavLink to={RouteBlog}>
                   <LiaBlogSolid />
                      <span>Blogs</span>
                    </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem >
                    <SidebarMenuButton asChild isActive={location.pathname === RouteCommentDetails} tooltip="Comments" className="sidebar-link rounded-xl px-3">
                   <NavLink to={RouteCommentDetails}>
                   <FaRegComments />
                      <span>Comments</span>
                    </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                </>
                :
                <>
                </>
                
              }


              {user && user.isLoggedIn && user?.user?.role === "admin"  ?
              
              <>
              
              <SidebarMenuItem >
                    <SidebarMenuButton asChild isActive={location.pathname === RouteCategoryDetails} tooltip="Categories" className="sidebar-link rounded-xl px-3">
                  <NavLink to={RouteCategoryDetails}>
                   <TbCategory2 />
                    <span>Categories</span>
                    </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem >
                    <SidebarMenuButton asChild isActive={location.pathname === RouteUserDetails} tooltip="Users" className="sidebar-link rounded-xl px-3">
                  <NavLink to={RouteUserDetails}>
                   <FiUsers />
                     <span>Users</span>
                    </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </>
              :
              <>
              </>
            }

            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="gap-2">
          <SidebarGroupLabel className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
           Categories
          </SidebarGroupLabel>
            <SidebarMenu className="gap-2">

            {categoryData && categoryData.category.length>0
              && categoryData.category.map(category=> 

                <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton asChild isActive={location.pathname === RouteBlogByCategory(category.slug)} tooltip={category.name} className="sidebar-link rounded-xl px-3">
                      <Link to={RouteBlogByCategory(category.slug)}>
                   <BiRadioCircle />
                      <span>{category.name}</span>
                      </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>)
               
               

             }
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
     
    </Sidebar>
  )
}

export default AppSidebar


