import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../../redux/cart/selectors";
import { CartItem } from "../../redux/cart/types";
import { addItem } from "../../redux/cart/slice";

type PizzaBlockProps = {
	id: string;
	imageUrl: string[];
	title: string;
	types: number[][];
	price: number[];
	rating: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, types }) => {
	const dispatch = useDispatch();
	const cartItem = useSelector(selectCartItemById(id));
	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);

	const addedCount = cartItem ? cartItem.countById : 0;

	const onClickAdd = () => {
		const item: CartItem = {
			id,
			title,
			price: price[activeSize],
			imageUrl: imageUrl,
			type: activeType,
			size: activeSize,
			weight: types[activeType][activeSize],
			count: 0,
			countById: 0,
		};
		dispatch(addItem(item));
	};

	React.useEffect(() => {
		String(types[activeType][0]) === "x"
			? setActiveSize(1)
			: String(types[activeType][1]) === "x"
			? setActiveSize(2)
			: setActiveSize(0);
	}, []);

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link key={id} to={`/pizza/${id}`}>
					<img
						className="pizza-block__image"
						src={process.env.PUBLIC_URL + imageUrl[activeType]}
						alt="Pizza"
					/>
					<h4 className="pizza-block__title">{title}</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((type, i) => (
							<>
								<li
									key={`${type}${i}`}
									onClick={() => setActiveType(i)}
									className={activeType === i ? "active" : ""}>
									{i === 0 ? "стандарт" : "тонкое"}
								</li>
							</>
						))}
					</ul>
					<ul>
						{types[activeType][0] && String(types[activeType][0]) !== "x" && (
							<li onClick={() => setActiveSize(0)} className={activeSize === 0 ? "active" : ""}>
								26 cм
							</li>
						)}
						{types[activeType][1] && String(types[activeType][1]) !== "x" && (
							<li onClick={() => setActiveSize(1)} className={activeSize === 1 ? "active" : ""}>
								30 см
							</li>
						)}
						{types[activeType][2] && String(types[activeType][2]) !== "x" && (
							<li onClick={() => setActiveSize(2)} className={activeSize === 2 ? "active" : ""}>
								40 см
							</li>
						)}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">{price[activeSize]} ₽</div>
					<div className="pizza-block__weight">{types[activeType][activeSize]} г</div>
					<button onClick={onClickAdd} className="button button--outline button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};
