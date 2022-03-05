import React, { useEffect, useState } from "react";
import s from "./mobile.module.scss";

interface IMobileSubHeaderProps {}

const MobileSubHeader: React.FC<IMobileSubHeaderProps> = () => {
	return (
		<div className={s.sub_mobile_header}>
			<div>
				<img src='./images/sell/icons/menu.png' style={{ cursor: "pointer" }} alt='' />
			</div>
			<h5 className='subtitle_lower m-0'>Подтверждения</h5>
			<div>
				<img src='./images/sell/icons/update-arrow.png' style={{ cursor: "pointer" }} alt='' className='ml-3' />
			</div>
		</div>
	);
};

export { MobileSubHeader };
