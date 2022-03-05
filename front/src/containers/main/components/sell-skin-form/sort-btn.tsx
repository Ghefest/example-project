import React from "react";
import s from "../../main.module.scss";
import classNames from "classnames";
import { Button } from "semantic-ui-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import white_arrow_up from "../../../../images/main/arrows/price-white-up.svg";
import blue_arrow_down from "../../../../images/main/arrows/price-blue-down.svg";
import white_arrow_down from "../../../../images/main/arrows/a-z-white-down.svg";
import blue_arrow_up from "../../../../images/main/arrows/a-z-blue-up.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterSort, SelectInventoryFilterOrder, SelectInventoryFilterSort } from "../../../../store";

interface ISortBtnBoxProps {}

const priceArrows = [white_arrow_up, blue_arrow_down];
const nameArrows = [blue_arrow_up, white_arrow_down];

const SortButton = React.memo(
	({ sort, name, order, arrows }: { sort: string; name: string; order: string; arrows: string[] }) => {
		const dispatch = useDispatch();
		const selectedSort = useSelector(SelectInventoryFilterSort);

		const onClick = () => dispatch(updateFilterSort({ sort }));
		const isSelected = () => sort === selectedSort;

		return (
			<Button
				type='button'
				className={classNames(s.sort_btn, { [s.sort_btn_selected]: isSelected() })}
				inverted
				onClick={onClick}
			>
				{name}
				<Arrows order={order} arrows={arrows} />
			</Button>
		);
	},
);

const SortBtnBox: React.FC<ISortBtnBoxProps> = () => {
	const filterOrder = useSelector(SelectInventoryFilterOrder);

	return (
		<Row className='w-100 justify-content-start flex-nowrap'>
			<form className='w-100'>
				<Col>
					<SortButton name='Цена' sort='price' order={filterOrder} arrows={priceArrows} />
				</Col>
			</form>
			<form className='w-100'>
				<Col>
					<SortButton name='A-z' sort='name' order={filterOrder} arrows={nameArrows} />
				</Col>
			</form>
		</Row>
	);
};

const Arrow = React.memo(({ arrow }: { arrow: string }) => <img src={arrow} key={arrow} alt='' className='ml-2' />);

const Arrows = React.memo(({ order, arrows }: { order: string; arrows: string[] }) => {
	return (
		<>
			{order === "ASC"
				? arrows.map((arrow) => <Arrow key={arrow} arrow={arrow} />)
				: [...arrows].reverse().map((arrow) => <Arrow key={arrow} arrow={arrow} />)}
		</>
	);
});

export { SortBtnBox };
