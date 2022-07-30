import React from "react";
import { useDispatch } from "react-redux";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import { Sort as SortType, SortPropertyEnum } from "../redux/filter/types";
import { setSort } from "../redux/filter/slice";

type SortItem = {
	name: string;
	sortProperty: SortPropertyEnum;
};

type SortPopupProps = {
	value: SortType;
};

export const sortList: SortItem[] = [
	{ name: "популярности ▾", sortProperty: SortPropertyEnum.RATING_DESC },
	{ name: "популярности ▴", sortProperty: SortPropertyEnum.RATING_ASC },
	{ name: "цене ▾", sortProperty: SortPropertyEnum.PRICE_DESC },
	{ name: "цене ▴", sortProperty: SortPropertyEnum.PRICE_ASC },
	{ name: "алфавиту ▾", sortProperty: SortPropertyEnum.TITLE_DESC },
	{ name: "алфавиту ▴", sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
	const dispatch = useDispatch();
	const sortRef = React.useRef<HTMLDivElement>(null);

	useWhyDidYouUpdate("SortPopup", { value });
	const [open, setOpen] = React.useState(false);

	const onClickListItem = (obj: SortItem) => {
		dispatch(setSort(obj));
		setOpen(false);
	};

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
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<b>Сортировка:</b>
				<span onClick={() => setOpen(!open)}>
					<span className="sort__label-name">по {value.name}</span>
				</span>
			</div>
			{open && (
				<div className="sort__popup">
					<ul>
						{sortList.map((obj, i) => (
							<li
								key={i}
								onClick={() => onClickListItem(obj)}
								className={value.sortProperty === obj.sortProperty ? "active" : ""}>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});
