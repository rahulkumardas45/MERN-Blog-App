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
     <main className='app-surface animated-shell flex min-h-svh w-full flex-col'>
        {/* /Outlet ke jagah per page ka content dikhai dega */}
       <div  className='w-full flex-1 px-4 pb-10 pt-24 sm:px-6 lg:px-10 lg:pt-28'>
         <Outlet/> 
       </div>
         <Footer/>
     </main>
</SidebarProvider>



  )
}

export default Layout
