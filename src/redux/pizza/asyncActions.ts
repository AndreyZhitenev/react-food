import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	"pizza/fetchPizzasStatus",
	async (params) => {
		const { sortBy, order, category, search } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://62be8fcfbe8ba3a10d564082.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
		);

		return data;
	},
);
