
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { RouteBlogAdd, RouteBlogEdit} from '@/helpers/RouteName.js'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch.js'
import { getEnv } from '@/helpers/getEnv.js'
import Loading from '@/components/Loading'
import { deleteData } from '@/helpers/handle.Delete.js'
import { showToast } from '@/helpers/showtoast.js'

import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import moment from 'moment'
import { useSelector } from 'react-redux'

const BlogDetails = () => {
     const [refresh, setRefresh] = useState(false)
     const user = useSelector((state) => state.user)
     const currentUserId = user?.user?._id
     const isAdmin = user?.user?.role === 'admin'

     const canManageBlog = (blog) => {
      const authorId = blog?.author?._id || blog?.author
      return Boolean(isAdmin || (currentUserId && authorId && authorId.toString() === currentUserId.toString()))
     }
        
      const {data: blogData, loading, error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
      {
        method: 'GET',
        Credentials: 'include',
           headers: {
      'Content-Type': 'application/json'
        },
      },[refresh])

  

      
    const handleDelete = async(id)=>{
      const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`)
       if(response){

         setRefresh(!refresh),
         
        showToast("success", "Data Deleted")
       }else{
        showToast("error", "Failed to Delete Data")
       }
    }
    
    if(loading) return <Loading/>

  return (
     <div>
           <Card className="md:w-300 w-95">
               <CardHeader>
                <div >
                    <Button asChild >
                        <Link to ={RouteBlogAdd}>
                        Add Blog
                        </Link>
                    </Button>
                </div>
               </CardHeader>
               <CardContent>
               <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
        <TableHead >Author</TableHead>
      <TableHead >Category</TableHead>
      <TableHead >Title</TableHead>
      <TableHead>Slug</TableHead>
      <TableHead >Dated</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
    blogData && blogData.blog.length > 0 ?

      blogData.blog.map(blog => 

           <TableRow key={blog._id}>
            <TableCell>{blog.author?.name}</TableCell>
            <TableCell>{blog.category?.name}</TableCell>
            <TableCell>{blog.title}</TableCell>
            <TableCell>{blog.slug}</TableCell>
            
            <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>

            
            <TableCell className="flex gap-2">
              {canManageBlog(blog) ? (
              <>
              <Button variant= "outline" className="hover:bg-violet-500 hover:text-white" asChild >
                <Link to={RouteBlogEdit(blog._id)}>
                <FiEdit/>
                </Link>
              </Button>


               <Button variant= "outline" className="hover:bg-violet-500 hover:text-white" size="icon" onClick={()=>{
                handleDelete(blog._id)
                
               }}>
                <RiDeleteBinLine />
              </Button>
              </>
              ) : (
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-400">
                  Own post only
                </span>
              )}
            </TableCell>
          </TableRow>
      )
    :
    <TableRow>
       <TableCell colSpan={3}>
        Data not found
       </TableCell>
    </TableRow>
   }
  </TableBody>

</Table>

  </CardContent>
           </Card>
    </div>
  )
}

export default BlogDetails
