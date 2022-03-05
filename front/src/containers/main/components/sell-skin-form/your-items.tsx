import React from "react";
import s from "../../main.module.scss";
import classNames from "classnames";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ItemsBox } from "./sub-components/item-box/items-box";
import { GameSelect } from "./game-select";
import { SortBtnBox } from "./sort-btn";
import { SearchItemsInput } from "./search-items";
import { TradeLink } from "./trade-link";
import { UpdateBtn } from "./update-btn";
import { ItemAttribute } from "./item-attribute";
import { SelectInventoryFilterGames, updateFilterRarities, updateFilterTypes } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";

interface IYourItemsProps {}

const dota2Rarities = ["Common", "Uncommon", "Rare", "Mythical", "Legendary", "Immortal", "Arcana", "Ancient"];
const csGoTypes = [
	"Pistol",
	"SMG",
	"Rifle",
	"Sniper Rifle",
	"Shotgun",
	"Machinegun",
	"Agent",
	"Knife",
	"Container",
	"Sticker",
	"Graffiti",
	"Gloves",
	"Music Kit",
	"Patch",
	"Collectible",
	"Key",
	"Pass",
	"Gift",
	"Tag",
	"Tool",
];

const YourItems: React.FC<IYourItemsProps> = () => {
	const dispatch = useDispatch();
	const games = useSelector(SelectInventoryFilterGames);

	const onRarityPick = (rarities: string[]) => {
		dispatch(updateFilterRarities({ rarities }));
	};

	const onTypePick = (types: string[]) => {
		dispatch(updateFilterTypes({ types }));
	};

	return (
		<>
			<TradeLink />

			<Row>
				<Col md='6' xs='12'>
					<div className={s.input_container}>
						<SearchItemsInput />
					</div>
				</Col>

				<Col md='6' xs='12'>
					<div className={s.input_container}>
						<label htmlFor=''>Сортировать</label>
						<SortBtnBox />
					</div>
				</Col>
			</Row>

			<div className={classNames(s.input_wrapper)}>
				<div className={s.input_container}>
					<label htmlFor='gameSelect'>Игра</label>
					<GameSelect />
				</div>

				<UpdateBtn />
			</div>

			<div className={s.input_container}>
				{games.length === 1 && games[0] === "570" && (
					<>
						<label htmlFor=''>Редкость предметов</label>
						<ItemAttribute attributes={dota2Rarities} onPick={onRarityPick} />
					</>
				)}

				{games.length === 1 && games[0] === "730" && (
					<>
						<label htmlFor=''>Тип предметов</label>
						<ItemAttribute attributes={csGoTypes} onPick={onTypePick} />
					</>
				)}
				<ItemsBox />
			</div>
		</>
	);
};

export { YourItems };
