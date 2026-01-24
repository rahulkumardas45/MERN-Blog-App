import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/showtoast.js'
import { getEnv } from '@/helpers/getEnv.js'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetch } from '@/hooks/useFetch.js'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouteBlog } from '@/helpers/RouteName.js'
import Loading from '@/components/Loading'

const AddBlog = () => {

  const navigate = useNavigate()

  const user = useSelector(state=>
    state.user
  )
  

     const [filePreview, setFilePreview] = useState()
      const [file, setFile] = useState()

     const {data: categoryData, loading, error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`,
      {
        method: 'GET',
        Credentials: 'include'
        
      })

      const formSchema = z.object({
        category: z.string().min(3, "Category must be at least 3 characters long"),
        title: z.string().min(3, "Title must be at least 3 characters long"),
        slug: z.string().min(3, "slug must be at least 3 characters long"),
        blogContent: z.string().min(3, "blogContent must be at least 3 characters long"),

      })
      
      const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            category: '',
            title:'',
            slug: '',
            blogContent: '',
            
          },
        })


        const handleEditorData = async(event, editor)=>{
          const data = editor.getData()
          
          form.setValue('blogContent',data)

        }

      

        const blogTitle = form.watch('title')

        useEffect(()=>{
            if(blogTitle){
                const slug = slugify(blogTitle, { lower: true})
                form.setValue('slug', slug)
            }
        }, [blogTitle])
    
        
      
       async function onSubmit(values) {

         try {

           const newValues = { ...values, author:user.user._id}
  if(!file){
    showToast('error', 'featuredImage is required')
  }
          
              const formData = new FormData()
              formData.append('file', file)
              formData.append('data', JSON.stringify(newValues))
        
              //api respose from backend
                const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/add`, {
                 method:'post',
                 credentials: "include",
                 body: formData
               })
         //backend se data liye h res e sahayata se
               const data = await response.json()
         
               if (!response.ok) {
                return showToast("error", data.message)
               }
              form.reset()
              setFile()
              setFilePreview()

             navigate(RouteBlog)

              showToast("success", data.message)
         
         
             } catch (error) {
               showToast("error", error.message)
             }
   
        
        }

const handleFileSelection = async(files)=>{
  const file = files[0];
  const Preview = URL.createObjectURL(file)
  setFile(file)
  setFilePreview(Preview)


}


if(loading) return <Loading/>

  return (
      <Card className="md:w-auto w-90 md: ml-10 ">
       <CardContent>

   <h1 className='text-2xl font-bold text-center text-gray-500'>Add Blog</h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='md:mb-3 '>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem >
             
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                defaultValue ={field.value}>
  <SelectTrigger className="md:w-238 w-80">
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    {categoryData && categoryData.category.length>0
  && categoryData.category.map( category =>


    <SelectItem  key= {category._id} value={category._id}>{category.name}</SelectItem>
  )

     }
    
  </SelectContent>
</Select>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className='mb-3 mt-5'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className='mb-3'>
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="slug.." {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='mb-3'>
            <span>Featured Image</span>

        <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles) }>
  {({getRootProps, getInputProps}) => (
    
      <div {...getRootProps()}>
        <input {...getInputProps()} />
          <div className='flex justify-center items-center w-36 h-28 border-2 border-dashed rounded mt-3 mb-5'>
            <img src={filePreview} alt="" />
          </div>
   
       </div>
  )}
</Dropzone>
       </div>

<div className='mb-3 mr-35 mt-10'>

 <FormField
  control={form.control}
  name="blogContent"
  render={() => (
    <FormItem>
      <FormLabel>Blog Content</FormLabel>

      <Editor
        initialData=""
        onChange={handleEditorData}
      />

      <FormMessage />
    </FormItem>
  )}
/>


 
</div>

       
        <Button variant="outline" className="w-full bg-green-500 text-gray hover:bg-green-600" type="submit"  >Submit</Button>
        
      </form>
    </Form>
       </CardContent>
      </Card>
   
  )
}

export default AddBlog