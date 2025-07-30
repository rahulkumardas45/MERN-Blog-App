import { getEnv } from '@/helpers/getEnv.js';
import { showToast } from '@/helpers/showtoast';
import { useFetch } from '@/hooks/useFetch.js';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const LikeCount = ({props}) => {

    const [likeCount, setLikeCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)


    const user = useSelector((state)=>state.user)


const {data: blogLikeCount, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`,
       {
         method:'get',
         Credentials: 'include',

       })

      
     
  useEffect (()=>{
    if(blogLikeCount){
        setLikeCount(blogLikeCount.likecount)
        setIsLiked(blogLikeCount.isUserliked)
    }

  },[blogLikeCount])


       const handleLike = async()=>{
        try {
            if(!user.isLoggedIn){
                alert('Please login to like this blog')
            }

            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/do-like`,{
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-type': "application/json"},

                body: JSON.stringify({user: user.user._id, blogid: props.blogid})
                
            })

            if(!response.ok){
                showToast('error',  response.statusText)

            }

            const responseData = await response.json()
            setLikeCount (responseData.likecount)
            setIsLiked(!isLiked)



        } catch (error) {
             showToast('error',  error.message)
            
        }

       }

  return (
    < div onClick ={handleLike} type='button' className='flex  justify-between items-center gap-1 cursor-pointer'>
    {!isLiked ?
            < FaRegHeart  />
            :
            < FaHeart color='red'/>
    }
            {likeCount}

        </div>
  )
}

export default LikeCount