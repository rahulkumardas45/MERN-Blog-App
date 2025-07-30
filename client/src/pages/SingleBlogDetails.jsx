import Comment from '@/components/Comment'
import CommentCount from '@/components/CommentCount'
import CommentList from '@/components/CommentList'
import LikeCount from '@/components/LikeCount'

import Loading from '@/components/Loading'
import RelatedBlog from '@/components/RelatedBlog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getEnv.js'
import { useFetch } from '@/hooks/useFetch.js'
import { decode } from 'entities'
import moment from 'moment'
import React from 'react'

import { useParams } from 'react-router-dom'

export const SingleBlogDetails = () => {
 

    const {blog, category} = useParams()
    

   const {data, loading, error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
        {
          method: 'GET',
          Credentials: 'include'
          
        },[blog, category])
         
if(loading) return <Loading/>

  return (
    <div className='md:flex-nowrap flex-wrap flex justify-between gap-15 '>
      {data && data.blog && 

      <>  
      <div className='border rounded md:w-[70%] w-full md:mr-2 p-5 pt-5'>
     <h1 className='text-1xl font-bold mb-5'>{data.blog.title}</h1>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between items-center gap-5 '>
          <Avatar>
            <AvatarImage  src={data.blog.author.avatar}/>
          </Avatar>
          <div>
          <p>{data.blog.author.name}</p>
          <p>Date: {moment(data.blog.createdAt).format('DD-MM-YYYY')}</p>
          </div>
        </div>

        <div className='flex justify-between items-center gap-11'>
         <LikeCount props = {{blogid: data.blog._id}} />
          <CommentCount props= {{ blogid: data.blog._id}}/>
        </div>


      </div>
       <div className='my-5'>
        <img src={data.blog.featuredImage} alt="" className='rounded' />
       </div>
       <div dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) || ''}}>

       </div>
       <div className='border-t mt-5 pt-5'>
       <Comment props= {{ blogid:data.blog._id}}/>
       </div>
       
     
      </div>

        </>
      }


      <div className='border rounded md:w-[30%] w-full p-5'>
         <RelatedBlog  props = {{category : category, currentBlog: blog }}/>
      </div>

    </div>
  )
}
