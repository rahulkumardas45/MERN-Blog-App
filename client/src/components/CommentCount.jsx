import { getEnv } from '@/helpers/getEnv.js'
import { useFetch } from '@/hooks/useFetch.js'
import React from 'react'
import { FaRegComment } from "react-icons/fa";



const CommentCount = ({props}) => {

const {data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
       {
         method:'get',
         Credentials: 'include'
       })

      
      
  return (
    <div  type='button' className='flex  justify-between items-center gap-1 cursor-pointer'>

        <FaRegComment/>
        {data && data.commentnumber}
    </div>
  )
}

export default CommentCount