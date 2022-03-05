import React, { useState } from "react";
import s from "./withdrawal-money.module.scss";

import Row from "react-bootstrap/Row";
import ReactPaginate from "react-paginate";

import { WithdrawalMoneyItem } from "./withdrawal-money-item";
import { WITHDRAWAL_MONEY_ITEMS } from "./withdrawal-money-items";

interface IWithdrawalMoneyProps {}

const WithdrawalMoney: React.FC<IWithdrawalMoneyProps> = () => {
	const [users, setUsers] = useState(WITHDRAWAL_MONEY_ITEMS.slice(0, 30));
	const [pageNumber, setPageNumber] = useState(0);

	const usePerPages = 4;
	const pagesVisited = pageNumber * usePerPages;

	const pageCount = Math.ceil(users.length / usePerPages);

	const changePage = ({ selected }: any) => {
		setPageNumber(selected);
	};

	const displayUsers = users
		.slice(pagesVisited, pagesVisited + usePerPages)
		.map((user, i) => <WithdrawalMoneyItem key={i} {...user} />);

	return (
		<>
			<Row className={s.withdrawal_money_box}>{displayUsers}</Row>
			{/*  @ts-ignore */}
			<ReactPaginate
				previousLabel='<'
				nextLabel='>'
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName='pagination_btn'
				previousLinkClassName='pagination_prev_btn'
				nextLinkClassName='pagination_next_btn'
				activeClassName='pagination_active'
			/>
		</>
	);
};

export { WithdrawalMoney };
