import React from "react";
import s from "../../main.module.scss";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useFormik } from "formik";

interface IItemAttributeProps {
	attributes: string[];

	onPick: Function;
}

const ItemAttribute: React.FC<IItemAttributeProps> = ({ attributes, onPick }) => {
	const formik = useFormik({
		initialValues: {
			pickedItems: [],
		},
		onSubmit: ({ pickedItems }) => {
			onPick(pickedItems);
		},
	});

	return (
		<form onChange={formik.handleSubmit}>
			<ToggleButtonGroup className='flex-wrap' type='checkbox' name='pickedItems'>
				{attributes.map((attr) => {
					return (
						<ToggleButton
							name='pickedItems'
							className={s.checkbox_btn}
							key={attr}
							value={attr}
							onChange={formik.handleChange}
						>
							{attr}
						</ToggleButton>
					);
				})}
			</ToggleButtonGroup>
		</form>
	);
};

export { ItemAttribute };
