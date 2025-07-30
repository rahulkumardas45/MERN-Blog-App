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
import { Link } from "react-router-dom"
import logo from "@/assets/images/logo-white.png"
import { AiOutlineHome } from 'react-icons/ai';
import { TbCategory2 } from 'react-icons/tb';
import { LiaBlogSolid } from 'react-icons/lia';
import { FaRegComments } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { BiRadioCircle } from 'react-icons/bi';
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUserDetails } from "@/helpers/RouteName.js";
import { useFetch } from "@/hooks/useFetch.js";
import { getEnv } from "@/helpers/getEnv.js";
import { useState } from "react";
import { useSelector } from "react-redux";

const AppSidebar = () => {

  const user = useSelector(state => state.user);
  
   const {data: categoryData}= useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: 'GET',
      Credentials: 'include'
      
    })

    

  return (
     <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} width= {120} alt="" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
            <SidebarMenu >
                <SidebarMenuItem >
                   <Link to={RouteIndex} >
                    <SidebarMenuButton>
                       <AiOutlineHome />
                        Home
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>

                {user && user.isLoggedIn ?
                <>
                <SidebarMenuItem >
                  <Link to={RouteBlog}>
                    <SidebarMenuButton>
                   <LiaBlogSolid />
                      Blogs
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem >
                   <Link to={RouteCommentDetails}>
                    <SidebarMenuButton>
                   <FaRegComments />
                      Comments
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                </>
                :
                <>
                </>
                
              }


              {user && user.isLoggedIn && user.user.role === "admin"  ?
              
              <>
              
              <SidebarMenuItem >
                  <Link to={RouteCategoryDetails}>
                    <SidebarMenuButton>
                   <TbCategory2 />
                    Categories
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem >
                  <Link to={RouteUserDetails}>
                    <SidebarMenuButton>
                   <FiUsers />
                     Users
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
              </>
              :
              <>
              </>
            }

            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
           Categories
          </SidebarGroupLabel>
            <SidebarMenu >

            {categoryData && categoryData.category.length>0
              && categoryData.category.map(category=> 

                <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton>
                   <BiRadioCircle />
                      <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
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


