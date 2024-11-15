import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCryptoData, CryptoData } from '../services/api';

interface CryptoState {
  cryptoList: CryptoData[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  cryptoList: [],
  loading: false,
  error: null,
};

export const loadCryptoData = createAsyncThunk('crypto/loadCryptoData', async () => {
  const data = await fetchCryptoData();
  return data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCryptoData.fulfilled, (state, action: PayloadAction<CryptoData[]>) => {
        state.loading = false;
        state.cryptoList = action.payload;
      })
      .addCase(loadCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load data';
      });
  },
});

export default cryptoSlice.reducer;
