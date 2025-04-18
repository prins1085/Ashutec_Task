"use client"

import { useAppSelector } from "@/lib/hooks"
import PokemonCard from "./pokemon-card"
import { selectFilteredPokemon } from "@/redux/slices/pokemonSlice"

export default function PokemonGrid() {
  const pokemon = useAppSelector(selectFilteredPokemon)

  if (pokemon.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p>No Pokemon found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
