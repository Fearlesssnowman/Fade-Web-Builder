import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";
import { db } from "@/lib/db";

export interface CounterSliceState {
  value: number;
  customString: string;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterSliceState = {
  value: 0,
  customString: "Default String",
  status: "idle",
};

export const counterSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: (create) => ({
    increment: create.reducer((state) => {
      state.value += 1;
      
    }),
    decrement: create.reducer((state) => {
      state.value -= 1;
    }),
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      },
    ),
    populate: create.reducer((state, action: PayloadAction<string>) => {
      state.customString += action.payload;
    }),
    updateDB: create.asyncThunk(
      async (newString: string) => {
        try {
          console.log("reached here");
          const response = {success: "true", content: newString};
          console.log("This is the response ", response);
          return response;
        } catch (error) {
          console.error("An error occurred:", error);
          throw error; // Rethrow the error to let Redux Toolkit handle it
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.customString = action.payload.content;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchCount(amount);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value += action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectCount: (counter) => counter.value,
    selectStatus: (counter) => counter.status,
    selectString: (counter) => counter.customString,
  },
});

export const { decrement, increment, populate, updateDB, incrementByAmount, incrementAsync } =
  counterSlice.actions;

export const { selectCount, selectStatus, selectString } = counterSlice.selectors;

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(incrementByAmount(amount));
    }
  };
