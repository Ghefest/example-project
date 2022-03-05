import React, { useState } from "react";
import classNames from "classnames";
import s from "../../main.module.scss";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";
import { useDispatch } from "react-redux";
import { updateFilterName } from "../../../../store";
import CloseCircle from "../../../../images/all/close-circle.svg";

interface ISearchItemsInputProps {}

const SearchItemsInput: React.FC<ISearchItemsInputProps> = React.memo(() => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const debounced = useDebouncedCallback((value) => {
		dispatch(updateFilterName({ name: value }));
	}, 60);

	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setSearch(value);
		debounced(value);
	};

	const deleteSearch = () => {
		setSearch("");
		dispatch(updateFilterName({ name: "" }));
	};

	return (
		<div className={s.search_input_wrapper}>
			<label htmlFor='searchItems'>Поиск предметов</label>

			<div className={s.search_input_container}>
				<img id='search_icon' className={s.search_icon} src='./images/main/sell-skins-form/search.svg' alt='' />
				<input
					className={classNames(s.input, s.search_input)}
					type='text'
					id='searchItems'
					name='searchItems'
					placeholder='Поиск'
					value={search}
					onChange={onInput}
				/>
				{search.length > 0 && (
					<img className={s.close_icon} src={CloseCircle} alt='delete input' onClick={deleteSearch} />
				)}
			</div>
		</div>
	);
});

export { SearchItemsInput };
