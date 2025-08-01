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


const CategoryDetails = () => {

  const [refresh, setRefresh] = useState(false)
    
  const {data: categoryData, loading, error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`,
  {
    method: 'GET',
    Credentials: 'include',
     headers: {
       origin: getEnv("VITE_API_BASE_URL"),
      'Content-Type': 'application/json'
        },
    
  },[refresh])

const handleDelete = async(id)=>{
  const response =await deleteData(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`)
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
                        <Link to ={RouteAddCategory}>
                        Add Category
                        </Link>
                    </Button>
                </div>
               </CardHeader>
               <CardContent>
               <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Category</TableHead>
      <TableHead>Slug</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
    categoryData && categoryData.category.length > 0 ?

      categoryData.category.map(category => 

           <TableRow key={category._id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell className="flex gap-2">
              <Button variant= "outline" className="hover:bg-violet-500 hover:text-white" asChild >
                <Link to={RouteEditCategory(category._id)}>
                <FiEdit/>
                </Link>
              </Button>
               <Button variant= "outline" className="hover:bg-violet-500 hover:text-white" asChild size="icon" onClick={()=>{
                handleDelete(category._id)
                
               }}>
                <Link>
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

export default CategoryDetails