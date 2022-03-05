import React from "react";

export interface ISellForMoneyProps {
	title: string;
	subtitle: string;
	buttonText: string;
}

const SellForMoney: React.FC<ISellForMoneyProps> = (props) => {
	return (
		<>
			<h1 className='title' style={{ width: "100%", maxWidth: "600px" }}>
				{props.title}
				<div className='strip' style={{ width: "60%" }}></div>
			</h1>

			<h3 className='subtitle pt-3' style={{ width: "100%", color: "#fff", maxWidth: "540px" }}>
				{props.subtitle}
			</h3>
		</>
	);
};

export { SellForMoney };
