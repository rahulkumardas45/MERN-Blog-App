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
import { useNavigate, useParams } from 'react-router-dom'
import { RouteBlog } from '@/helpers/RouteName.js'
import Loading from '@/components/Loading'
import { decode } from 'entities'

const EditBlog = () => {
  const {blogid} = useParams()

  const navigate = useNavigate()

  const user = useSelector((state)=>
    state.user
  )
  

     const [filePreview, setFilePreview] = useState()
      const [file, setFile] = useState()

     const {data: categoryData }= useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`,
      {
        method: 'GET',
        Credentials: 'include'
        
      })



      const {data: blogData, loading:blogLoading,error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid}`,
      {
        method: 'GET',
        Credentials: 'include'
        
      }, [blogid])

     

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

    useEffect(()=>{
      if(blogData){
        setFilePreview(blogData.blog.featuredImage)
        form.setValue('category',blogData.blog.category._id)
        form.setValue('title',blogData.blog.title)
         form.setValue('slug',blogData.blog.slug)
         form.setValue('blogContent',decode(blogData.blog.blogContent))
      }
    },[blogData])


        const handleEditorData = (event, editor)=>{
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

              const formData = new FormData()
              formData.append('file', file)
              formData.append('data', JSON.stringify(values))
        
              //api respose from backend
                const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/update/${blogid}`, {
                 method:'put',
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

const handleFileSelection = (files)=>{
  const file = files[0];
  const Preview = URL.createObjectURL(file)
  setFile(file)
  setFilePreview(Preview)


}


if(blogLoading) return <Loading/>



  return (
      <Card className="w-250 ml-10 ">
       <CardContent>

        <h1 className='text-2xl font-bold text-center text-gray-500'>Edit Blog</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mb-3'>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem >
             
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                value={field.value}>
  <SelectTrigger className="w-238">
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

        <div className='mb-3'>
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
          render={({ field }) => (
            <FormItem >
              <FormLabel >Blog Content</FormLabel>
              <FormControl  className = "">
              <Editor  props={{initialData: field.value, onChange :handleEditorData}}/>
              </FormControl>
              
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

export default EditBlog