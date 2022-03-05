import React from "react";
import s from "../../main.module.scss";
import classNames from "classnames";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { rarityToColors } from "./colors";
import { useSelector } from "react-redux";
import { SelectSettingsPriceCurrency } from "../../../../store";

export interface ILiveTradeProps {
	id: number;
	name: string;
	image: string;
	price: number;
	rubPrice: number;
	appid: number;
	rarity: string;
	rarityColor: string;
}

const appIdToGame = new Map();
appIdToGame.set(570, "DOTA 2");
appIdToGame.set(730, "CS:GO");

const LiveTrade: React.FC<ILiveTradeProps> = React.memo(
	({ name, image, price, rubPrice, appid, rarity, rarityColor }) => {
		return (
			<Col lg='2' md='3' xs='6'>
				<div
					className={classNames(s.trade_box, "mt-5")}
					style={{
						borderColor: rarityToColors.get(rarity)?.border,
						backgroundColor: rarityToColors.get(rarity)?.background,
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}
				>
					<div className='d-flex justify-content-between'>
						<h6 className='text_lower' style={{ fontSize: "16px", color: "#72AAFF" }}>
							{appIdToGame.get(appid)}
						</h6>
						<Price price={price} rubPrice={rubPrice} />
					</div>
					<img
						style={{ maxWidth: "142.5px", maxHeight: "142.5px", textAlign: "center" }}
						className='pt-3 pb-5'
						src={image}
						alt=''
					/>

					<Button
						variant='outline'
						size='sm'
						style={{
							borderColor: rarityToColors.get(rarity)?.buttonBorder,
							backgroundColor: rarityToColors.get(rarity)?.buttonBackground,
							color: rarityToColors.get(rarity)?.buttonColor,
							fontSize: "1em",
							borderWidth: "1.25px",
							fontWeight: 600,
							boxShadow: rarityToColors.get(rarity)?.boxShadow,
						}}
					>
						{rarity}
					</Button>

					<h6
						className='text_lower pt-3'
						style={{
							color: "white",
							fontSize: "16px",
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden",
						}}
					>
						{name}
					</h6>
				</div>
			</Col>
		);
	},
);

const Price: React.FC<Pick<ILiveTradeProps, "price" | "rubPrice">> = ({ price, rubPrice }) => {
	const currency = useSelector(SelectSettingsPriceCurrency);

	return (
		<h6 className='text_lower' style={{ color: "#fff", fontSize: "16px" }}>
			{currency === "USD" ? `${price} $` : `${rubPrice} ₽`}
		</h6>
	);
};

export { LiveTrade };
