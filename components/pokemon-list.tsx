"use client"

import { useAppSelector } from "@/lib/hooks"
import { selectFilteredPokemon } from "@/redux/slices/pokemonSlice"
import Image from "next/image"

export default function PokemonList() {
  const pokemon = useAppSelector(selectFilteredPokemon)

  if (pokemon.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p>No Pokemon found.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Types
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pokemon.map((pokemon) => (
            <tr key={pokemon.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex-shrink-0 h-10 w-10 relative">
                  <Image
                    src={pokemon.sprites.front_default || "/placeholder.svg"}
                    alt={pokemon.name}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #{pokemon.id.toString().padStart(3, "0")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 capitalize">{pokemon.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  {pokemon.types && pokemon.types.length > 0 ? (
                    pokemon.types.map((type, index) => (
                      <span
                        key={`${type.type.name}-${index}`}
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${type.type.name}-100 text-${type.type.name}-800 capitalize`}
                      >
                        {type.type.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
