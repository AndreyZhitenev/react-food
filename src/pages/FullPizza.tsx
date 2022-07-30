import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../redux/cart/selectors";
import { CartItem } from "../redux/cart/types";
import { addItem } from "../redux/cart/slice";

interface Pizza {
	id: string;
	imageUrl: string[];
	title: string;
	types: number[][];
	price: number[];
	rating: number;
}

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<Pizza | null>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = window.location.href.split("/")[5];

	const cartItem = useSelector(selectCartItemById(id));

	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);

	const addedCount = cartItem ? cartItem.countById : 0;

	const onClickAdd = () => {
		const item: CartItem = {
			id: pizza!.id,
			title: pizza!.title,
			price: pizza!.price[activeSize],
			imageUrl: pizza!.imageUrl,
			type: activeType,
			size: activeSize,
			weight: pizza!.types[activeType][activeSize],
			count: 0,
			countById: 0,
		};
		dispatch(addItem(item));
	};

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get<Pizza>(
					"https://62be8fcfbe8ba3a10d564082.mockapi.io/items/" + id,
				);
				setPizza(data);
			} catch (error) {
				alert("Ошибка при получении пиццы!");
				navigate("/");
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <>Загрузка...</>;
	}

	console.log();

	return (
		<div className="container container--fullPizza">
			<div className="pizza-block">
				<div className="pizza-block_left">
					<Link to="/">
						<button className="button button--outline button--add" onClick={() => navigate(-1)}>
							<span>Назад</span>
						</button>
					</Link>
					<img
						src={
							process.env.PUBLIC_URL + pizza.imageUrl[activeType].replace("pizzas", "pizzas/full")
						}
						className="pizza-block__image"
						alt="Pizza"
					/>
				</div>
				<div className="pizza-block_right">
					<div className="pizza-block__info">
						<h1 className="pizza-block__title">{pizza.title}</h1>
						<h2>Пищевая ценность на 100 г</h2>
						<div className="nutritional">
							<div className="col">
								<div className="pdp-row">
									<span>Энерг. ценность</span>
									<span>241 ккал</span>
								</div>
								<div className="pdp-row">
									<span>Белки</span>
									<span>10.4 г</span>
								</div>
								<div className="pdp-row">
									<span>Жиры</span>
									<span>12.8 г</span>
								</div>
								<div className="pdp-row">
									<span>Углеводы</span>
									<span>21.2 г</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="pizza-block__selector">
							<ul>
								{pizza.types.map((type, i) => (
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
								{pizza.types[activeType][0] && (
									<li onClick={() => setActiveSize(0)} className={activeSize === 0 ? "active" : ""}>
										26 cм
									</li>
								)}
								{pizza.types[activeType][1] && (
									<li onClick={() => setActiveSize(1)} className={activeSize === 1 ? "active" : ""}>
										30 см
									</li>
								)}
								{pizza.types[activeType][2] && (
									<li onClick={() => setActiveSize(2)} className={activeSize === 2 ? "active" : ""}>
										40 см
									</li>
								)}
							</ul>
						</div>
						<div className="pizza-block__bottom">
							<div className="pizza-block__price">{pizza.price[activeSize]} ₽</div>
							<div className="pizza-block__weight">{pizza.types[activeType][activeSize]} г</div>
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
					<div className="pizza-block__content">
						<p>
							Отличительной чертой пиццы «Пепперони» является ее остро-жгучий вкус. В этой пицце
							главную роль играет колбаса «Пепперони», нарезанная небольшими кусочками. Жирные
							острые кусочки салями великолепно сочетаются с нежностью Моцареллы.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FullPizza;
