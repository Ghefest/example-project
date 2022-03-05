import React from "react";
import s from "./item.module.scss";
import "./item-clean.scss";
import classNames from "classnames";
import { Item } from "./item";
import { Loader } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
	inventorySelectors,
	SelectIsInventoryLoading,
	SelectTotalSelectedItems,
	SelectedItemsActions,
	SelectInventoryTotalItems,
	increaseScrollPage,
} from "../../../../../../store";
import InfiniteScroll from "react-infinite-scroll-component";

interface IItemsBoxProps {}

const ItemsBox: React.FC<IItemsBoxProps> = React.memo(() => {
	const dispatch = useDispatch();

	const isInventoryLoading = useSelector(SelectIsInventoryLoading);
	const inventory = useSelector(inventorySelectors.selectAll);
	const inventoryTotalItems = useSelector(SelectInventoryTotalItems);
	const totalSelectedItems = useSelector(SelectTotalSelectedItems);

	const removeAllSelections = () => dispatch(SelectedItemsActions.removeAll());
	const loadNextItems = () => dispatch(increaseScrollPage());

	const selectAll = () => {
		inventory.forEach((item) => {
			if (!item.isBlacklisted) {
				dispatch(
					SelectedItemsActions.addOne({
						id: item.id,
						price: item.price,
						rubPrice: item.rubPrice,
					}),
				);
			}
		});
	};

	return (
		<>
			<div className={classNames("d-flex justify-content-center align-items-center", s.items_box_wrapper)}>
				<div id='items-box' className={classNames(s.items_box, "items__box")}>
					<InfiniteScroll
						style={{ position: "relative", display: "flex", flexWrap: "wrap" }}
						scrollableTarget={"items-box"}
						dataLength={inventory.length}
						next={loadNextItems}
						hasMore={inventory.length < inventoryTotalItems}
						loader={
							<div className={s.loader} hidden={!isInventoryLoading}>
								<Loader active inline></Loader>
							</div>
						}
					>
						{inventory.map((item) => (
							<Item key={item.id} {...item} />
						))}
					</InfiniteScroll>
				</div>
			</div>

			<div className={s.btn_box}>
				<button type='button' style={{ color: "#00DD66" }} onClick={selectAll}>
					Выбрать все товары
				</button>
				<div className='d-flex align-items-center'>
					<p className='subtitle_lower mr-3 mt-3'>Выбрано {totalSelectedItems} товара</p>
					<button style={{ color: "#F5DD0A" }} onClick={removeAllSelections}>
						Снять все выделения
					</button>
				</div>
			</div>
		</>
	);
});

export { ItemsBox };
