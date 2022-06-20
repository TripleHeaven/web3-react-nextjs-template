import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export const setupWeb3 = createAsyncThunk("SetupWeb3", async (data, thunk) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await signer.getBalance();

    return {
      provider,
      address: address,
      balance,
    };
  } catch (error) {
    console.log("error", error);
    return thunk.rejectWithValue(error.message);
  }
});

export interface Web3State {
  provider?: ethers.providers.Web3Provider | null;
  address?: string | null;
  isError: boolean;
  balance?: ethers.BigNumber | null;
}

const initialState: Web3State = {
  provider: null,
  address: null,
  balance: null,
  isError: false,
};

interface SetupFulfilled {
  provider: ethers.providers.Web3Provider;
  address: string;
  balance: ethers.BigNumber;
}

export const setupWeb3Slice = createSlice({
  name: "SetupWeb3Slice",
  initialState: initialState as Web3State,
  reducers: {
    clearWeb3: (state: Web3State) => {
      state.provider = null;
      state.address = null;
      state.balance = null;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setupWeb3.fulfilled,
      (state: Web3State, action: PayloadAction<SetupFulfilled>) => {
        state.provider = action.payload.provider;
        state.address = action.payload.address;
        state.balance = action.payload.balance;
      }
    ),
      builder.addCase(
        setupWeb3.rejected,
        (state: Web3State, action: PayloadAction<any>) => {
          state.isError = true;
        }
      ),
      builder.addCase(
        setupWeb3.pending,
        (state: Web3State, action: PayloadAction) => {
          state.provider = null;
          state.address = null;
          state.balance = null;
        }
      );
  },
});

export const setupWeb3Reducer = setupWeb3Slice.reducer;

export const { clearWeb3 } = setupWeb3Slice.actions;
