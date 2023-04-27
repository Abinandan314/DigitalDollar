import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import WalletService from "../services/wallet.service";

export const transfer = createAsyncThunk(
    "wallet/transfer",
    async ({ senderUsername, username, transferAmount ,token}, thunkAPI) => {
        try {
          const response = await WalletService.transfer(senderUsername, username, transferAmount,token);
          return response.data;
        } catch (error) {
          const message = error.response.data.toString();
          thunkAPI.dispatch(setMessage(message));
          return thunkAPI.rejectWithValue();
        }
      }
);