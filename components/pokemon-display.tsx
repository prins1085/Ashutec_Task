"use client"

import { useEffect } from "react"
import PokemonGrid from "./pokemon-grid"
import PokemonList from "./pokemon-list"
import Pagination from "./pagination"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchPokemonList, selectPokemonStatus } from "@/redux/slices/pokemonSlice"
import { LoadingSpinner } from "./ui/LoadingSpinner"

export default function PokemonDisplay() {
  const dispatch = useAppDispatch()
  const { view } = useAppSelector((state) => state.ui)
  const { currentPage, totalPages, selectedType } = useAppSelector((state) => state.pokemon)
  const status = useAppSelector(selectPokemonStatus)

  useEffect(() => {
    if (selectedType === null) {
      dispatch(fetchPokemonList({ limit: 20, offset: (currentPage - 1) * 20 }))
    }
  }, [dispatch, currentPage, selectedType])

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="text-center p-8 text-red-500">
        <p>Failed to load data.</p>
      </div>
    )
  }

  return (
    <div>
      {view === "grid" ? <PokemonGrid /> : <PokemonList />}

      {selectedType === null && totalPages > 1 && (
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
