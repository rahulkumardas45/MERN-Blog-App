import { RouteSearch } from '@/helpers/RouteName.js'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(RouteSearch(query))
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="relative w-[350px] md:w-[400px]">
        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here..."
          className="
            w-full h-10 pl-10 pr-4
            rounded-full
            border border-gray-300
            bg-gray-50
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-green-500
            focus:border-green-500
            transition
          "
        />

        {/* Search Icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </form>
  )
}

export default SearchBox
