import React from "react";
import s from "../support.module.scss";

interface IWorksWrapperProps {}

const WorksWrapper: React.FC<IWorksWrapperProps> = () => {
	return (
		<div className={s.works_wrapper}>
			<h1 className='title'>
				Как это работает?
				<div className='strip mt-3' style={{ width: "80%", margin: "0 auto" }}></div>
			</h1>

			<div className={s.gif_box}>
				<h2 className='title_lower'>Тут гифка</h2>
			</div>
		</div>
	);
};

export { WorksWrapper };
