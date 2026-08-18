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
    <form onSubmit={handleSubmit} className="flex w-full justify-center">
      <div className="interactive-control relative w-full">
        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here..."
          className="
            h-11 w-full min-w-0 pl-11 pr-4
            rounded-full
            border border-slate-200
            bg-white/88
            shadow-lg shadow-slate-200/60
            text-sm text-slate-700
            placeholder:text-slate-400
            focus:outline-none
            focus:ring-2 focus:ring-green-500/30
            focus:border-green-500
            transition-all
            md:h-12 md:text-base
          "
        />

        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          width="19"
          height="19"
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
