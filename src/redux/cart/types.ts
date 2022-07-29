export type CartItem = {
	id: string;
	title: string;
	price: number;
	size: number;
	weight: number;
	imageUrl: string[];
	type: number;
	count: number;
	countById: number;
};

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}
