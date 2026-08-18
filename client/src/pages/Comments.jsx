import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'

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
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteData } from '@/helpers/handle.Delete.js'
import { showToast } from '@/helpers/showtoast.js'
import moment from 'moment'
import { useSelector } from 'react-redux'


const Comments = () => {

  const [refresh, setRefresh] = useState(false)
  const user = useSelector((state) => state.user)
  const currentUserId = user?.user?._id
  const isAdmin = user?.user?.role === 'admin'

  const canDeleteComment = (comment) => {
    const commentUserId = comment?.user?._id || comment?.user
    return Boolean(isAdmin || (currentUserId && commentUserId && commentUserId.toString() === currentUserId.toString()))
  }
    
  const {data, loading, error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`,
  {
    method: 'GET',
    Credentials: 'include'
    
  },[refresh])

 

const handleDelete = async(id)=>{
  const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`)
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
            
               <CardContent>
               <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Blog</TableHead>
      <TableHead>Comment By</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Comment</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
       data && data.comments.length> 0 ?

      data.comments.map(comment => 

           <TableRow key={comment._id}>
            <TableCell>{comment?.blogid?.title}</TableCell>
            <TableCell>{comment?.user?.name}</TableCell>
             <TableCell>{moment(comment?.createdAt).format('DD-MM-YYYY')}</TableCell>
            <TableCell>{comment?.comment}</TableCell>
            <TableCell className="flex gap-2">
              {canDeleteComment(comment) ? (
              <Button variant= "outline" className="hover:bg-violet-500 hover:text-white" size="icon"  onClick={()=>{
                handleDelete(comment._id)
               }}>
                              <RiDeleteBinLine />
                            </Button>
              ) : (
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-400">
                  Own comment only
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

export default Comments
