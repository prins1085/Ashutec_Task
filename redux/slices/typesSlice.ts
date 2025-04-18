import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PokemonTypeListResponse, PokemonTypeEntry } from "@/lib/types";
import { RootState } from "../store";

interface TypesState {
  items: PokemonTypeEntry[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TypesState = {
  items: [],
  status: "idle",
  error: null,
};

// Fetch Pokemon types
export const fetchPokemonTypes = createAsyncThunk("types/fetchPokemonTypes", async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type");

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon types");
  }

  const data: PokemonTypeListResponse = await response.json();

  const standardTypes = data.results.filter((type) => !["unknown", "shadow"].includes(type.name));

  return standardTypes;
});

const typesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPokemonTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch Pokemon types";
      });
  },
});

// Selectors
export const selectAllTypes = (state: RootState) => state.types.items;
export const selectTypesStatus = (state: RootState) => state.types.status;
export const selectTypesError = (state: RootState) => state.types.error;

export default typesSlice.reducer;