import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit,  RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUserDetails } from './helpers/RouteName.js'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetails from './pages/Category/CategoryDetails'
import EditCategory from './pages/Category/EditCategory'
import BlogDetails from './pages/Blog/BlogDetails'
import AddBlog from './pages/Blog/AddBlog'
import EditBlog from './pages/Blog/EditBlog'
import { SingleBlogDetails } from './pages/SingleBlogDetails'
import BlogByCategory from './pages/Blog/BlogByCategory'
import SearchResult from './pages/SearchResult'
import Comments from './pages/Comments'
import Users from './pages/Users'
import AuthUserProtection from './components/AuthUserProtection'
import AuthUserProtectiononlyAdmin from './components/AuthUserProtectiononlyAdmin'


const App = () => {
  return (
    <BrowserRouter>
     <Routes>
     <Route path= {RouteIndex} element={<Layout/>}>
    <Route index element={<Index/>} />

    <Route path={RouteProfile} element={<Profile/>}/>

    {/* blog category */}

     <Route path={RouteAddCategory} element={<AddCategory/>}/>
      <Route path={RouteCategoryDetails} element={<CategoryDetails/>}/>
      <Route path={RouteEditCategory()} element={<EditCategory/>}/>
{/* Blog */}
        <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}/>
        <Route path={RouteSearch()} element={<SearchResult/>}/>

        
      
        <Route path={RouteBlogDetails()} element={<SingleBlogDetails/>}/>
        <Route path={RouteCommentDetails} element={<Comments/>}/>
           
       
        <Route path={RouteBlogDetails()} element={<SingleBlogDetails/>}/>
           
        <Route path={RouteUserDetails} element={<Users/>}/>

         <Route element={<AuthUserProtection/>}>
         <Route path={RouteBlog} element={<BlogDetails/>}/>
       <Route path={RouteBlogEdit()} element={<EditBlog/>}/>
        <Route path={RouteBlogAdd} element={<AddBlog/>}/>
        <Route path={RouteCommentDetails} element={<Comments/>}/>
         </Route>


     <Route element={<AuthUserProtectiononlyAdmin/>}>
         
         </Route>

     </Route>
    <Route path={RouteSignIn} element={<SignIn/>} />
    <Route path={RouteSignUp} element={<SignUp/>} />

     </Routes>
    </BrowserRouter>
  )
}

export default App  