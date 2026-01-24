import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaCalendarAlt } from "react-icons/fa"
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard = ({ props }) => {
  return (
    <Link
      to={RouteBlogDetails(props.category.slug, props.slug)}
      className="group"
    >
      <Card
        className="
          pt-5
          overflow-hidden
          transition
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <CardContent className="space-y-3">

          {/* Author Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={props.author.avatar || usericon} />
              </Avatar>
              <span className="text-sm font-medium text-gray-700">
                {props.author.name}
              </span>
            </div>

            {props.author.role === 'admin' && (
              <Badge className="bg-violet-500 text-white">
                Admin
              </Badge>
            )}
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-md">
            <img
              src={props.featuredImage}
              alt={props.title}
              className="
                w-full
                h-48
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </div>

          {/* Content */}
          <div>
            <p className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <FaCalendarAlt />
              <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
            </p>

            <h2
              className="
                text-xl
                font-bold
                line-clamp-2
                transition-colors
                duration-300
                group-hover:text-green-600
              "
            >
              {props.title}
            </h2>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}

export default BlogCard
