import { RouteSearch } from '@/helpers/RouteName.js';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SearchBox() {
  const navigate = useNavigate();

  const [query, setQuery] = useState();

  const getInput =(e)=>{
    setQuery(e.target.value)

  }

  const handleSubmit = (e)=>{
    //on tsubmit page can't reload
    
    e.preventDefault();
    navigate(RouteSearch(query))
    

  }
  return (
   <form  onSubmit={handleSubmit}
   >
    <input  name='q' onInput={getInput}   placeholder=' Search here...' className=' md:w-[400px] w-[350px] h-9 rounded-full border-b bg-gray-50 '/>
   </form>
  )
}

export default SearchBox