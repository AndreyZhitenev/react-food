import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.price === action.payload.price &&
					obj.type === action.payload.type,
			);

			const findSimilarItemById = state.items.find((obj) => obj.id === action.payload.id);

			if (!findItem) {
				state.items.push({ ...action.payload, count: 1, countById: 1 });
			} else {
				findItem.count++;
			}
			findSimilarItemById && findSimilarItemById.countById++;
			state.totalPrice = calcTotalPrice(state.items);
		},

		minusItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.price === action.payload.price &&
					obj.type === action.payload.type,
			);
			if (findItem) {
				findItem.count--;
				findItem.countById--;
			}
			state.totalPrice = calcTotalPrice(state.items);
		},
		removeItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.price === action.payload.price &&
					obj.type === action.payload.type,
			);
			state.items = state.items.filter(
				(obj) =>
					obj.id !== action.payload.id ||
					obj.price !== action.payload.price ||
					obj.type !== action.payload.type,
			);

			state.items.forEach((obj) => {
				if (obj.id === findItem!.id) {
					obj.countById -= findItem!.count;
				}
			});

			state.totalPrice = calcTotalPrice(state.items);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
