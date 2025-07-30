import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { Card } from "@/components/ui/card"
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName.js"
import { Link, useNavigate } from "react-router-dom"
import { showToast } from "@/helpers/showtoast.js"
import { getEnv } from "@/helpers/getEnv.js"
import GoogleLogin from "@/components/GoogleLogin.jsx"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/user/user.slice.js"
import logo from "@/assets/images/logo-white.png"
const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:'',
      password: '',
    },
  })

 async function onSubmit(values) {
     try {
      //api respose from backend
        const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/login`, {
         method:'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         credentials: "include",

         body: JSON.stringify(values)
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
  return (
   <div className='flex justify-center items-center h-screen w-screen'>
      <Card className="w-[400px] p-5">

        <div className="flex justify-center items-center mb-2">

        <Link to={RouteIndex}>
        <img src={logo} alt="" />
        </Link>
        </div>
        
        <h3 className="text-2xl font-bold text-center mb-5">Login Into Your Account</h3>
   
<div className="">
  <GoogleLogin/>
  <div className="border my-5 flex justify-center items-center relative">
    <span  className="absolute bg-white text-sm">Or</span>
  </div>
</div>

<hr />

  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mb-3'>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className='mb-3'>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="mt-5">
        <button type="submit" className="w-full bg-green-500 text-gray hover:bg-green-600" >Sign In</button>
        <div className="mt-5 text-sm text-center text-gray-500 flex justify-center items-center gap-2">
          <p>Don't have account?</p>
          <Link className="text-blue-500 hover:underline" to={RouteSignUp}>Sign Up</Link>
        </div>
        </div>
      </form>
    </Form>
      </Card>
   
    </div>
  )
}

export default SignIn