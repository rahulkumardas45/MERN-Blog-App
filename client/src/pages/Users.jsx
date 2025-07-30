import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName.js'

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
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteData } from '@/helpers/handle.Delete.js'
import { showToast } from '@/helpers/showtoast.js'
import moment from 'moment'
import usericon from "@/assets/images/user.png"


const Users = () => {

  const [refresh, setRefresh] = useState(false)
    
  const {data, loading, error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/user/get-all-users`,
  {
    method: 'GET',
    Credentials: 'include'
    
  },[refresh])


  
const handleDelete = async(id)=>{
  const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`)
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
  <TableHeader className="font-bold text-red-500">
    <TableRow >
      <TableHead >Role</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Avatar</TableHead>
      <TableHead>Dated</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
       data && data.users.length> 0 ?

      data.users.map(user => 

           <TableRow key={user._id}>
            <TableCell>{user?.role}</TableCell>
            <TableCell>{user?.name}</TableCell>
             <TableCell>{user?.email}</TableCell>
              <TableCell>  
                
       <img  className = "w-10 "src={user?.avatar || usericon} alt="" />
              </TableCell>
             <TableCell>{moment(user?.createdAt).format('DD-MM-YYYY')}</TableCell>
              
            <TableCell className="flex gap-2">
              <Button variant= "outline" className="hover:bg-violet-500 hover:text-white" asChild size="icon"  onClick={()=>{
                handleDelete(user._id)
               }}>
                              <Link to=''>
                              <RiDeleteBinLine />
                              
                              </Link>
                            </Button>
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

export default Users