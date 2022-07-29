import { RootState } from "../store";

export const selectPizzaData = (state: RootState) => state.pizza;

export const selectPizzaCount = (state: RootState) => state.pizzaCount;
