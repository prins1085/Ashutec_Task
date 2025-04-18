// Pokemon Types
export interface Pokemon {
  id: number
  name: string
  url?: string
  sprites: {
    front_default: string | null
    other?: {
      "official-artwork"?: {
        front_default?: string
      }
    }
  }
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

// Type Types
export interface PokemonTypeEntry {
  name: string
  url: string
}

export interface PokemonTypeListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonTypeEntry[]
}

export interface PokemonTypeResponse {
  id: number
  name: string
  pokemon: {
    pokemon: {
      name: string
      url: string
    }
    slot: number
  }[]
}
