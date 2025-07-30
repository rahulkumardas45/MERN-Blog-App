import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { useFetch } from '@/hooks/useFetch.js'
import { getEnv } from '@/helpers/getEnv.js'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'


const BlogCard = ({props}) => {
    // const [refresh, setRefresh] = useState(false)

    

  return (
<Link to={RouteBlogDetails(props.category.slug, props.slug )}>
    <Card className="pt-5">
        <CardContent>
        <div className='flex items-center justify-between'>
        <div className='flex items-center justify-between gap-3'>
            <Avatar className="">
                   <AvatarImage src={props.author.avatar || usericon } />
            </Avatar>
            <span> {props.author.name}</span>
        </div>
        {props.author.role === 'admin' && 
        
            <Badge  variant="outline" className="bg-violet-500">
                Admin
            </Badge>
        
        }
        </div>
        <div className='my-2'>
          <img src={props.featuredImage} alt="" className='rounded' />
        </div>
        <div>
            <p className='flex items-center gap-2 mb-2'>
      <FaCalendarAlt/>
      <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
            </p>
            <h2 className='text-2xl font-bold line-clamp-2'>{props.title}</h2>
        </div>
        </CardContent>
    </Card>
</Link>
  )
}

export default BlogCard