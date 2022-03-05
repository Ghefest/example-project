import React, { useEffect, useState } from "react";
import s from "./mobile.module.scss";

interface IMobileHeaderProps {}

const MobileHeader: React.FC<IMobileHeaderProps> = () => {
	const locale = "ua";
	const [today, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 60 * 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const time = today.toLocaleTimeString(locale, { hour: "numeric", hour12: false, minute: "numeric" });

	return (
		<div className={s.mobile_header}>
			<div className='text-white fs-6'>{time}</div>
			<div className='d-flex align-items-center'>
				<img src='./images/sell/icons/vibration.png' width='10' className='mr-1' alt='' />
				<img src='./images/sell/icons/wifi.png' width='10' className='ml-1 mr-1' alt='' />
				<img src='./images/sell/icons/signal.png' width='10' className='ml-1 mr-1' alt='' />
				<img src='./images/sell/icons/low-battery.png' width='10' className='ml-1' alt='' />
			</div>
		</div>
	);
};

export { MobileHeader };
