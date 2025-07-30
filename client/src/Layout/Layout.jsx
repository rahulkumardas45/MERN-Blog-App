import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    
     //topbar

 <SidebarProvider>
    <Topbar/>
   <AppSidebar />
     <main className='w-full'>
        {/* /Outlet ke jagah per page ka content dikhai dega */}
       <div  className='w-full min-h-[calc(100vh-35px)] py-28 px-10'>
         <Outlet/> 
       </div>
         <Footer/>
     </main>
</SidebarProvider>



  )
}

export default Layout