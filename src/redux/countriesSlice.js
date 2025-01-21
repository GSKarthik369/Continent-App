import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get(
      "https://restcountries.com/v2/all?fields=name,region,flag"
    );
    return response.data;
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    filteredCountries: [],
    status: "idle",
    region: "All", // Default filter
  },
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
      state.filteredCountries =
        action.payload === "All"
          ? state.countries
          : state.countries.filter(
              (country) => country.region === action.payload
            );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setRegion } = countriesSlice.actions;

export default countriesSlice.reducer;
