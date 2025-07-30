import React, { useEffect } from 'react'
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
import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch.js'

const EditCategory = () => {

  const {category_id} = useParams()
  const { data: categoryData, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/show/${category_id}`,
  {
    method: 'GET',
    credentials: 'include'

  }, [category_id]
)




      const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        slug: z.string().min(3, "slug must be at least 3 characters long"),
        
    
      })
      
      const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            name: '',
            slug:'',
            
          },
        })

        const categoryName = form.watch('name')

        useEffect(()=>{
            if(categoryName){
                const slug = slugify(categoryName, { lower: true})
                form.setValue('slug', slug)
            }
        }, [categoryName])
    
         useEffect(()=>{
             if(categoryData){
               form.setValue('name', categoryData.category.name)
               form.setValue('slug', categoryData.category.slug)
             }

         },[categoryData])
        
      
       async function onSubmit(values) {
        try {
           const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/category/update/${category_id}`,
            {
            method:'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })

        
    //backend se data liye h res e sahayata se
          const data = await response.json()
    
          if (!response.ok) {
         return showToast("error", data.message)
          }
          

          showToast("success", data.message)
        } catch (error) {
          showToast("error", error.message)
        }
          
        
        }



  return (
      <Card className="w-160 ml-40 ">
       <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mb-3'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
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

       
        <button className="w-full bg-green-500 text-gray hover:bg-green-600" type="submit"  >Submit</button>
        
      </form>
    </Form>
       </CardContent>
      </Card>
   
  )
}

export default EditCategory