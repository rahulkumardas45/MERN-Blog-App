import { Card, CardContent } from '@/components/ui/card'
import usericon from '@/assets/images/user.png'

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"


import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { getEnv } from '@/helpers/getEnv.js'
import { Link, useNavigate } from 'react-router-dom'
import { showToast } from '@/helpers/showtoast.js'
import { useDispatch, useSelector } from 'react-redux'
import { useFetch } from '@/hooks/useFetch.js'
import Loading from '@/components/Loading'
import { FaCamera } from "react-icons/fa6";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice.js'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'






const Profile = () => {
  const [filePreview, setFilePreview] = useState()
  const [file, setFile] = useState()
     
    const user = useSelector((state)=>{
       return state.user
     })

    const dispatch = useDispatch()
    const navigate = useNavigate()
  const {data:userData, loading ,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
  {
    method: 'get',
    credentials: "include",

  }
)


  

const formSchema = z.object({
  name: z.string().min(3, 'name must be at least 3 characters'),
  email: z.string().email("Invalid email address"),
  bio: z.string().min(10, 'bio must be at least 10 characters'),
  
})

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:'',
      bio: "",
      password: '',
    },
  })

useEffect(()=>{
   if(userData && userData.success){
    form.reset(
      {
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
        

      }
    )

   }

}, [userData])

 async function onSubmit(values) {
     try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(values))

      //api respose from backend
        const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`, {
         method:'Put',
         credentials: "include",
         body: formData
       })
 //backend se data liye h res e sahayata se
       const data = await response.json()
 
       if (!response.ok) {
        return showToast("error", data.message)
       }

   dispatch(setUser(data.user))

       if(response.ok) {
         navigate(RouteIndex)
       }else{
        navigate(RouteSignUp)
       }

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



     if(loading) return <Loading/>

  return (
    
    <Card className="md:w-160  w-90 md:m-40 ml-1 "  aschild> 
     
  <CardContent>
       <div className='flex justify-center items-center mt-10 '>


{/* add the file selecting optiop use drozone */}

<Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles) }>
  {({getRootProps, getInputProps}) => (
    
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        
   <Avatar className="w-28 h-28 relative group  "  >
  <AvatarImage src={ filePreview ? filePreview : userData?.user?.avatar}  />
   <div className=" absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    justify-center items-center bg-black bg-opacity-10
    border-2 border-violet-500 rounded-full 
    group-hover:flex hidden cursor-pointer ">
   
<FaCamera  color='#764bc5ff'/>
   </div>
         </Avatar>
       </div>
  
  )}
</Dropzone>
</div>
    
    <div>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mb-4 '>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
              
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name  address" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

         <div className='mb-4 '>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  placeholder="Enter your Email  address" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className='mb-4 '>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea 
                placeholder="Enter your bio.."
                 {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className='mb-4'>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type = "password" placeholder="Enter your password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

       <button type="submit" className="w-full bg-green-500 text-gray hover:bg-green-600" >Save Changes</button> 
        
      </form>
       </Form>
      </div>
  </CardContent>

    </Card>
  )
}

export default Profile