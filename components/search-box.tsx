"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { setSearchQuery } from "@/redux/slices/pokemonSlice"
import { useAppDispatch } from "@/lib/hooks"

export default function SearchBox() {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState("")

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchQuery(query))
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, dispatch])

  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search Pokemon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
