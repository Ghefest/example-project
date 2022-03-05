import React, { useRef } from "react";
import s from "../support.module.scss";
import classNames from "classnames";
import { ReactComponent as BarTack } from "../../../images/all/bartack.svg";

interface IFileInputProps {
	formik: any;
}

const FileInput: React.FC<IFileInputProps> = ({ formik }) => {
	const fileInput = useRef<HTMLInputElement>(null);

	const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target && e.target.files?.length) {
			const file = e.target.files[0];
			formik.setFieldValue("image", file);
		}
	};

	const callInputClick = () => {
		fileInput.current?.click();
	};

	return (
		<div className={s.file_input}>
			<BarTack className={s.bar_tack_icon} onClick={callInputClick} />

			<input ref={fileInput} type='file' id='file' accept='.jpg, .jpeg, .png' hidden onChange={fileChange} />

			<div className={s.info}>
				<p className={s.title} onClick={callInputClick}>
					Прикрепить картинку
				</p>
				<label>
					<p className={classNames("text_lower mt-2", s.description)}>Можно прикреплять форматы PNG, JPEG, JPG</p>
				</label>
			</div>
		</div>
	);
};

export { FileInput };
