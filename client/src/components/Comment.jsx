import React, { useState } from 'react'
import { FaRegComments } from "react-icons/fa6";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { showToast } from '@/helpers/showtoast';
import { getEnv } from '@/helpers/getEnv';
import { Button } from '@/components/ui/button'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Link } from 'react-router-dom';
import { RouteSignIn } from '@/helpers/RouteName';
import { useSelector } from 'react-redux';
import CommentList from './CommentList';

const Comment = ({props}) => {

  const [newComment, setNewComment] = useState()

     const user = useSelector((state)=>state.user)
   
     const formSchema = z.object({
            comment: z.string().min(3, "comment must be at least 3 characters long"),
           
          })
          
          const form = useForm({
              resolver: zodResolver(formSchema),
              defaultValues: {
                comment: '',
               
                
              },
            })
    
             async function onSubmit(values) {
                    try {
                        const newValues = {...values, blogid:props.blogid, user: user.user._id}
                       const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/comment/add`, {
                        method:'POST',
                        credentials: 'include',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newValues)
                      })
                //backend se data liye h res e sahayata se
                      const data = await response.json()
                
                      if (!response.ok) {
                     return showToast("error", data.message)
                      }

                      setNewComment(data.comment)

                      form.reset()
                      
                      showToast("success", data.message)
                    } catch (error) {
                      showToast("error", error.message)
                    }
                      
                    
                    }

  return (
    <div>
        <h4 className='flex items-center gap-3 font-bold text-2xl'> <FaRegComments className='text-violet-500'/> Comment</h4>
     {user && user.isLoggedIn ?
     
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
         <div className='mb-3 mt-5'>
         <FormField
           control={form.control}
           name="comment"
           render={({ field }) => (
             <FormItem >
               <FormLabel>Comment</FormLabel>
               <FormControl>
                <Textarea placeholder='Type your comment...' {...field} />
               </FormControl>
               
               <FormMessage />
             </FormItem>
           )}
         />
         </div>
         
       
 
        
         <button varient='outline' className=' text-blue-500 ' type="submit"  >Submit</button>
         
       </form>
     </Form>
     :
     <Button aschild= 'true'>
        <Link to={RouteSignIn}>
         Sing In
        </Link>
     </Button>

     }

     <div>
      <CommentList props={{blogid: props.blogid, newComment}} />
     </div>


       
    </div>

    )
}

export default Comment