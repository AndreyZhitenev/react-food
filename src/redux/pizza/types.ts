export type Pizza = {
	id: string;
	imageUrl: string[];
	title: string;
	types: number[][];
	price: number[];
	category: number;
	rating: number;
	nutritions: [];
	desc: string;
};

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};

export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}
