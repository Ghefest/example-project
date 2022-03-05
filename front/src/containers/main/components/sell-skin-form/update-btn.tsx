import React from "react";
import s from "../../main.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { reloadInventory, SelectInventoryTotalItems, SelectIsInventoryLoading } from "../../../../store";
import update_icon from "../../../../images/all/update.png";

interface IUpdateBtnProps {}

const UpdateBtn: React.FC<IUpdateBtnProps> = () => {
	const dispatch = useDispatch();
	const totalItems = useSelector(SelectInventoryTotalItems);
	const isInventoryLoading = useSelector(SelectIsInventoryLoading);

	const onReloadInventory = () => {
		if (!isInventoryLoading) dispatch(reloadInventory());
	};

	return (
		<div className='d-flex align-items-center' style={{ paddingTop: "35px" }}>
			<p className={s.sold_items}>Всего {totalItems} товаров</p>
			<button className={classNames(s.update_btn)} onClick={onReloadInventory}>
				обновить
				<img src={update_icon} alt='' className='ml-3' />
			</button>
		</div>
	);
};

export { UpdateBtn };
