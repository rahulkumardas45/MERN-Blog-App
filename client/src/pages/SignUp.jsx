import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { Card } from "@/components/ui/card"
import { RouteSignIn } from "@/helpers/RouteName"
import { data, Link ,useNavigate} from "react-router-dom"
import { getEnv } from "@/helpers/getEnv"
import { showToast } from "@/helpers/showtoast"
import GoogleLogin from "@/components/GoogleLogin"

function SignUp() {

  const navigate = useNavigate()
  // Define the validation schema using Zod
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().refine((data) => (data.password === data.confirmPassword), "Password and confirm password should be same")

  })
  
  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        email:'',
        password: '',
        confirmPassword: '',
      },
    })

    
  
   async function onSubmit(values) {
    try {
       const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/register`, {
        method:'POST',
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
       
        navigate(RouteSignIn)
      showToast("success", data.message)


    } catch (error) {
      showToast("error", error.message)
    }
      
    
    }
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Card className="w-[400px] p-5">
        <h3 className="text-2xl font-bold text-center mb-5">Create Your New Account</h3>
   
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
          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
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
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className='mb-3'>
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Re-enter Password " {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="mt-5">
        <button className="w-full bg-green-500 text-gray hover:bg-green-600" type="submit"  >Sign Up</button>
        <div className="mt-5 text-sm text-center text-gray-500 flex justify-center items-center gap-2">
          <p>Already have an account?</p>
          <Link className="text-blue-500 hover:underline" to={RouteSignIn}>Sign In</Link>
        </div>
        </div>
      </form>
    </Form>
      </Card>
   
    </div>
  )
}

export default SignUp