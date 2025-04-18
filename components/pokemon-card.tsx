"use client"

import type { Pokemon } from "@/lib/types"
import Image from "next/image"

interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 bg-gray-50 flex justify-center">
        <div className="relative h-32 w-32">
          <Image
            src={pokemon.sprites.front_default || "/placeholder.svg"}
            alt={pokemon.name}
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">#{pokemon.id.toString().padStart(3, "0")}</div>
        <h3 className="font-semibold text-lg mb-2 capitalize">{pokemon.name}</h3>
        {pokemon.types && pokemon.types.length > 0 ? (
          <div className="flex gap-2">
            {pokemon.types.map((type, index) => (
              <span
                key={`${type.type.name}-${index}`}
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${type.type.name}-100 text-${type.type.name}-800 capitalize`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
