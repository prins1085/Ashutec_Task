"use client"

import { useEffect } from "react"
import TypeNavigation from "./type-navigation"
import PokemonDisplay from "./pokemon-display"
import SearchBox from "./search-box"
import ViewToggle from "./view-toggle"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchPokemonTypes } from "@/redux/slices/typesSlice"
import { setView } from "@/redux/slices/uiSlice"

export default function PokemonExplorer() {
  const dispatch = useAppDispatch()
  const { view } = useAppSelector((state) => state.ui)

  useEffect(() => {
    dispatch(fetchPokemonTypes())
  }, [dispatch])

  const handleViewChange = (newView: "grid" | "list") => {
    dispatch(setView(newView))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon Explorer</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <TypeNavigation />
        </div>

        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <SearchBox />
            <ViewToggle currentView={view} onViewChange={handleViewChange} />
          </div>

          <PokemonDisplay />
        </div>
      </div>
    </div>
  )
}
