import React from "react";
import s from "../../main.module.scss";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { SelectInventoryFilterGames, updateFilterGames } from "../../../../store";

interface IGameSelectProps {}

const gamesToValue = new Map<string, number>();
gamesToValue.set("570, 730", 1);
gamesToValue.set("730", 2);
gamesToValue.set("570", 3);

const GameSelect: React.FC<IGameSelectProps> = React.memo(() => {
	const dispatch = useDispatch();

	const selectedGames = useSelector(SelectInventoryFilterGames);
	const selectAllGames = () => dispatch(updateFilterGames({ games: ["570", "730"] }));
	const selectDota2 = () => dispatch(updateFilterGames({ games: ["570"], types: [] }));
	const selectCsGo = () => dispatch(updateFilterGames({ games: ["730"], rarities: [] }));

	return (
		<form>
			<ToggleButtonGroup
				defaultValue={1}
				value={gamesToValue.get(selectedGames.toString())}
				className='flex-wrap'
				type='radio'
				name='gamePicked'
			>
				<ToggleButton
					className={s.checkbox_btn}
					type='radio'
					value={1}
					name='gamePicked'
					onChange={() => selectAllGames()}
				>
					Все
				</ToggleButton>
				<ToggleButton className={s.checkbox_btn} type='radio' value={2} name='gamePicked' onChange={() => selectCsGo()}>
					CS:GO
				</ToggleButton>
				<ToggleButton
					className={s.checkbox_btn}
					type='radio'
					value={3}
					name='gamePicked'
					onChange={() => selectDota2()}
				>
					DOTA 2
				</ToggleButton>
			</ToggleButtonGroup>
		</form>
	);
});

export { GameSelect };
