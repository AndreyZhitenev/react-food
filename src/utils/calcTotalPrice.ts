import { CartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((sum, obj) => (obj.price || 0) * obj.count + sum, 0);
};
