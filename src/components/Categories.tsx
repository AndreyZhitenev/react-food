import { useWhyDidYouUpdate } from "ahooks";
import React from "react";

type CategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
};

const categories = [
	"Все",
	"Мясные",
	"Вегетарианские",
	"Морские и Рыбные",
	"Закрытые",
	"Гриль",
	"Острые",
];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
	const sortRef = React.useRef<HTMLDivElement>(null);

	useWhyDidYouUpdate("SortPopup", { value });
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setOpen(false);
			}
		};
		document.body.addEventListener("click", handleClickOutside);

		return () => document.body.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div ref={sortRef} className="categories">
			<ul className="categories__list">
				{categories.map((categoryName, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={value === i ? "active" : ""}>
						{categoryName}
					</li>
				))}
			</ul>

			<div className="categories__label">
				<span onClick={() => setOpen(!open)}>
					<span className="categories__label-name">
						<b>
							{categories.map((categoryName, i) => {
								if (value === i) {
									return categoryName;
								}
							})}
						</b>
						<b>▼</b>
					</span>
				</span>
			</div>
			{open && (
				<div className="categories__popup">
					<ul>
						{categories.map((categoryName, i) => (
							<li
								key={i}
								onClick={() => onChangeCategory(i)}
								className={value === i ? "active" : ""}>
								{categoryName}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});
