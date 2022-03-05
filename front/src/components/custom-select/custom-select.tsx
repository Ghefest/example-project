import React, { useState } from "react";
import s from "./select.module.scss";

import selectArrow from "../../images/all/select.png";

interface ICustomSelectProps {
	options: Array<{
		Component: React.FC<{}>;
		option: string;
	}>;
	className?: string;
	SelectedOptionComponent: React.FC<{}>;
	onSelect: (option: string) => void;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({ options, className, SelectedOptionComponent, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggling = () => setIsOpen(!isOpen);

	const around = () => (isOpen ? "rotate(0.5turn)" : "rotate(0turn)");

	const onOptionClicked = (value: string) => () => {
		onSelect(value);
		setIsOpen(false);
	};

	return (
		<div className={className}>
			<div className={s.dropdown_header} onClick={toggling}>
				<SelectedOptionComponent />
				<img src={selectArrow} alt='' style={{ transform: around() }} />
			</div>
			{isOpen && (
				<div className={s.dropdown_list_container}>
					<div className={s.dropdown_list}>
						{options.map(({ Component, option }) => (
							<div className={s.list_item} onClick={onOptionClicked(option)}>
								<Component key={option} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export { CustomSelect };
