import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv.js'
import { useFetch } from '@/hooks/useFetch.js'
import React from 'react'


const Index = () => {
   
  // const [refresh, setRefresh] = useState(false)
        
      const {data: blogData, loading, error}= useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
      {
        method: 'GET',
        Credentials: 'include'
        
      })

      

      if(loading) return <Loading/>
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {blogData && blogData.blog.length >0
      ?
      blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
      :
  <div>
    Data Not Found.
  </div>

      }
    </div>
  )
}

export default Index