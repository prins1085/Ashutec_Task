import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  Pokemon,
  PokemonListResponse,
  PokemonTypeResponse,
} from "@/lib/types";
import { RootState } from "../store";

interface PokemonState {
  items: Pokemon[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  selectedType: string | null;
  searchQuery: string;
  isRequestPending: boolean;
}

const initialState: PokemonState = {
  items: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  selectedType: null,
  searchQuery: "",
  isRequestPending: false,
};

// Fetch Pokemon list with pagination
export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async (
    { limit, offset }: { limit: number; offset: number },
    { getState, dispatch }
  ) => {
    const state = getState() as RootState;

    if (state.pokemon.isRequestPending) {
      throw new Error("Previous request is still pending");
    }

    const abortController = new AbortController();
    dispatch(setIsRequestPending(true));

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        {
          signal: abortController.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon list");
      }

      const data: PokemonListResponse = await response.json();

      const totalCount = data.count;
      const totalPages = Math.ceil(totalCount / limit);

      const pokemonList = data.results.map((pokemon, index) => {
        const urlParts = pokemon.url.split("/");
        const id = Number.parseInt(urlParts[urlParts.length - 2]);

        return {
          id,
          name: pokemon.name,
          url: pokemon.url,
          sprites: {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            other: {
              "official-artwork": {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              },
            },
          },
          types: [],
        };
      });

      return {
        pokemon: pokemonList,
        totalPages,
      };
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        return { pokemon: [], totalPages: 1 };
      }
      throw error;
    } finally {
      dispatch(setIsRequestPending(false));
    }
  }
);

// Fetch Pokemon by type
export const fetchPokemonByType = createAsyncThunk(
  "pokemon/fetchPokemonByType",
  async (type: string, { getState, dispatch }) => {
    const state = getState() as RootState;

    if (state.pokemon.isRequestPending) {
      throw new Error("Previous request is still pending");
    }

    const abortController = new AbortController();
    dispatch(setIsRequestPending(true));

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon of type ${type}`);
      }

      const data: PokemonTypeResponse = await response.json();

      const pokemonList = data.pokemon.map((entry) => {
        const urlParts = entry.pokemon.url.split("/");
        const id = Number.parseInt(urlParts[urlParts.length - 2]);

        return {
          id,
          name: entry.pokemon.name,
          url: entry.pokemon.url,
          sprites: {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            other: {
              "official-artwork": {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              },
            },
          },
          types: [
            {
              slot: 1,
              type: {
                name: type,
                url: `https://pokeapi.co/api/v2/type/${type}`,
              },
            },
          ],
        };
      });

      return {
        pokemon: pokemonList,
        totalPages: 1, 
      };
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        return { pokemon: [], totalPages: 1 };
      }
      throw error;
    } finally {
      dispatch(setIsRequestPending(false));
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string | null>) => {
      state.selectedType = action.payload;
      state.currentPage = 1; 
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsRequestPending: (state, action: PayloadAction<boolean>) => {
      state.isRequestPending = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.pokemon;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        if (action.error.name !== "AbortError") {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch Pokemon";
        }
      })

      .addCase(fetchPokemonByType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.pokemon;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPokemonByType.rejected, (state, action) => {
        if (action.error.name !== "AbortError") {
          state.status = "failed";
          state.error =
            action.error.message || "Failed to fetch Pokemon by type";
        }
      });
  },
});

export const selectAllPokemon = (state: RootState) => state.pokemon.items;
export const selectPokemonStatus = (state: RootState) => state.pokemon.status;
export const selectPokemonError = (state: RootState) => state.pokemon.error;

export const selectFilteredPokemon = (state: RootState) => {
  const { items, searchQuery } = state.pokemon;

  if (!searchQuery) {
    return items;
  }

  const query = searchQuery.toLowerCase();
  return items.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.id.toString().includes(query) ||
      pokemon.types.some((type) => type.type.name.toLowerCase().includes(query))
  );
};

export const {
  setCurrentPage,
  setSelectedType,
  setSearchQuery,
  setIsRequestPending,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
