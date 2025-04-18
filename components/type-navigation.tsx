"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectAllTypes, selectTypesStatus } from "@/redux/slices/typesSlice"
import { fetchPokemonByType, fetchPokemonList, setSelectedType } from "@/redux/slices/pokemonSlice"
import { LoadingSpinner } from "./ui/LoadingSpinner"

export default function TypeNavigation() {
  const dispatch = useAppDispatch()
  const types = useAppSelector(selectAllTypes)
  const status = useAppSelector(selectTypesStatus)
  const { selectedType } = useAppSelector((state) => state.pokemon)

  const handleTypeClick = (type: string | null) => {
    dispatch(setSelectedType(type))

    if (type === null) {
      dispatch(fetchPokemonList({ limit: 20, offset: 0 }))
    } else {
      dispatch(fetchPokemonByType(type))
    }
  }

  if (status === "loading") {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Pokemon Types</h2>
        <div className="flex justify-center p-4">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Pokemon Types</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => handleTypeClick(null)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedType === null ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            All
          </button>
        </li>
        {types.map((type) => (
          <li key={type.name}>
            <button
              onClick={() => handleTypeClick(type.name)}
              className={`w-full text-left px-3 py-2 rounded-md capitalize transition-colors ${
                selectedType === type.name ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {type.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
