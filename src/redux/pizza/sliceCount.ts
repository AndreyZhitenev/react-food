import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzasCount } from "./asyncActions";
import { Pizza, PizzaSliceState, Status } from "./types";

export const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

export const pizzaSliceCount = createSlice({
	name: "pizzaCount",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzasCount.pending, (state, action) => {
			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchPizzasCount.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.items = action.payload;
		});

		builder.addCase(fetchPizzasCount.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const { setItems } = pizzaSliceCount.actions;

export default pizzaSliceCount.reducer;
