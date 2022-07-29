import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
	currentPage: number;
	onChangePage: (page: number) => void;
	pizzaCount: number;
};

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	onChangePage,
	pizzaCount,
}) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={8}
			pageCount={pizzaCount / 8}
			forcePage={currentPage - 1}
		/>
	);
};
