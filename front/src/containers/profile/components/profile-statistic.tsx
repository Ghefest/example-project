import React, { useState } from "react";

import Row from "react-bootstrap/Row";

import { StatisticPersonalData } from "./sub-components/statistic-personal-data";

import { InvitedUser } from "./sub-components/invited-users/invited-user";
import { INVITED_USERS } from "./sub-components/invited-users/invited-users";

import ReactPaginate from "react-paginate";

interface IProfileStatisticProps {}

const ProfileStatistic: React.FC<IProfileStatisticProps> = () => {
	const [items, setItems] = useState(INVITED_USERS.slice(0, 30));
	const [pageNumber, setPageNumber] = useState(0);

	const usePerPages = 4;
	const pagesVisited = pageNumber * usePerPages;

	const pageCount = Math.ceil(items.length / usePerPages);

	const changePage = ({ selected }: any) => {
		setPageNumber(selected);
	};

	const displayUsers = items
		.slice(pagesVisited, pagesVisited + usePerPages)
		.map((item, i) => <InvitedUser key={i} {...item} />);

	return (
		<>
			<StatisticPersonalData />
			<Row className='mt-3 mb-5'>{displayUsers}</Row>
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

export { ProfileStatistic };
