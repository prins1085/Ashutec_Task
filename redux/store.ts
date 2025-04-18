import { configureStore } from "@reduxjs/toolkit"
import pokemonReducer from "./slices/pokemonSlice"
import typesReducer from "./slices/typesSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    types: typesReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
