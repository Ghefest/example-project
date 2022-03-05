import React from "react";
import s from "../support.module.scss";

import { ContactFrom } from "./contact-form";

interface IWriteFormWrapperProps {}

const WriteFormWrapper: React.FC<IWriteFormWrapperProps> = () => {
	return (
		<div id='write_to_support' className={s.write_wrapper}>
			<h1 className='retreat title text-right'>Напишите в поддержку</h1>
			<div className='strip' style={{ width: "15%", float: "right" }} />

			<div className={s.write_box}>
				<ContactFrom />
			</div>
		</div>
	);
};

export { WriteFormWrapper };
