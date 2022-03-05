import React, { useState } from "react";
import s from "./item.module.scss";
import "./item-clean.scss";
import { Checkbox } from "semantic-ui-react";
import classNames from "classnames";
import { ItemCloud } from "./item-cloud";
import { Button } from "semantic-ui-react";

import { Popup } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
	getIsSelectedItem,
	InventoryItem,
	RootState,
	SelectedItemsActions,
	SelectSettingsPriceCurrency,
} from "../../../../../../store";

export interface IItemProps extends InventoryItem {}

const Item: React.FC<IItemProps> = React.memo(
	(props) => {
		const { id, name, price, rubPrice, image, rarity, type, stickers, gems, isBlacklisted } = props;

		const isSelected = useSelector<RootState, boolean>((state) => getIsSelectedItem(state, id));
		const dispatch = useDispatch();

		const selectItem = () => {
			if (isSelected) dispatch(SelectedItemsActions.removeOne(id));
			else dispatch(SelectedItemsActions.addOne({ id, price, rubPrice }));
		};

		const cloudStyle = {
			borderRadius: "5px",
			borderColor: "#010122",
			backgroundColor: "#010122",
			boxShadow: "0px 0px 20px 0px #152152",
			minWidth: "300px",
		};

		if (isBlacklisted) {
			return <BlacklistedItem name={name} price={price} image={image} rubPrice={rubPrice} />;
		}

		return (
			<div className={classNames(s.item)}>
				<Popup
					trigger={
						<Button className={classNames({ [s.info_btn]: true, [s.info_btn_style_checked]: isSelected })}>
							<span className='d-flex'>
								Info
								<img className='ml-2' src='./images/main/sell-skins-form/info.png' alt='' />
							</span>
						</Button>
					}
					content={<ItemCloud rarity={rarity} type={type} name={name} image={image} stickers={stickers} gems={gems} />}
					style={cloudStyle}
					basic
					hoverable
					on='click'
				/>
				<div
					className={classNames({ [s.item_content]: true, [s.item_content_checked]: isSelected })}
					onClick={selectItem}
				>
					<ItemPrice price={price} rubPrice={rubPrice} />
					<div className='text-center mt-2'>
						<img src={image} alt='' className={s.item_product} />
					</div>
					<div className={s.name_content}>
						<h4 className={classNames("subtitle_lower mt-1", s.item_name)}>{name}</h4>
					</div>

					<Checkbox
						className={classNames({
							[s.checkbox]: true,
							[s.checkbox_hidden]: !isSelected,
						})}
						checked={isSelected}
						value={name}
					/>
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.children === nextProps.children &&
			prevProps.gems?.toString() === nextProps.gems?.toString() &&
			prevProps.id === nextProps.id &&
			prevProps.image === nextProps.image &&
			prevProps.isBlacklisted === nextProps.isBlacklisted &&
			prevProps.name === nextProps.name &&
			prevProps.price === nextProps.price &&
			prevProps.rarity === nextProps.rarity &&
			prevProps.stickers?.toString() === nextProps.stickers?.toString() &&
			prevProps.type === nextProps.type
		);
	},
);

const ItemPrice: React.FC<Pick<InventoryItem, "price" | "rubPrice">> = React.memo(({ price, rubPrice }) => {
	const currency = useSelector(SelectSettingsPriceCurrency);

	return (
		<div className={classNames("title_lower text-right", s.price)}>
			{currency === "USD" ? `${price} $` : `${rubPrice} ₽`}
		</div>
	);
});

const BlacklistedItem: React.FC<Pick<InventoryItem, "price" | "rubPrice" | "image" | "name">> = React.memo(
	({ price, rubPrice, image, name }) => {
		return (
			<div className={classNames(s.item)}>
				<img style={{ position: "absolute", top: 50, left: 50, zIndex: 5 }} src='/images/main/item/Warning.svg' />
				<div
					className={classNames({
						[s.item_content]: true,
						[s.blacklisted_item]: true,
					})}
				>
					<ItemPrice price={price} rubPrice={rubPrice} />
					<div className='text-center mt-2'>
						<img style={{ opacity: 0.22 }} src={image} alt='' className={s.item_product} />
					</div>
					<div className={s.name_content}>
						<h4 className={classNames("subtitle_lower mt-1", s.item_name)}>{name}</h4>
					</div>
				</div>
			</div>
		);
	},
);

export { Item };
