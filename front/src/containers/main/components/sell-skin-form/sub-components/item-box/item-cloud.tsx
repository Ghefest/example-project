import React from "react";
import s from "./item.module.scss";
import { StickerImg } from "../sticker/sticker";
import { Gem, Sticker } from "../../../../../../store";
import { rarityToColors } from "../../../live-trade/colors";
import { GetMeRO } from "@pot-back/common";

export interface IItemCloudProps {
	name: string;
	image: string;
	rarity: string;
	type: string;
	stickers?: Sticker[];
	gems?: Gem[];
}

const ItemCloud: React.FC<IItemCloudProps> = ({ name, image, rarity, type, stickers, gems }) => {
	const displayGemsOrStickers = (elements: any[]) => {
		if (elements.length >= 4) {
			elements.splice(4);
		}

		return elements.map((el, i) => <StickerImg key={i} {...el} />);
	};

	return (
		<div className={s.cloud}>
			<h4 className='title_lower text-left'>{name}</h4>
			<div className='d-flex mt-2'>
				<div
					className={s.item_type}
					style={{
						backgroundColor: rarityToColors.get(rarity)?.buttonBackground,
						borderColor: rarityToColors.get(rarity)?.border,
						color: rarityToColors.get(rarity)?.buttonColor,
					}}
				>
					{rarity}
				</div>
				<div className={s.item_weapon_type}>
					<h5 className={s.type_name}>{type}</h5>
				</div>
			</div>

			<div className='d-flex justify-content-between'>
				<div className='mt-2'>
					<img src={image} alt='' width='180' />
				</div>
				<div className={s.stickers_box}>
					{stickers && stickers.length && displayGemsOrStickers(stickers)}
					{gems && gems.length && displayGemsOrStickers(gems)}
				</div>
			</div>
		</div>
	);
};

export { ItemCloud };
