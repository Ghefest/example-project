import React from "react";
import s from "../../main.module.scss";
import classNames from "classnames";

// react-bootstrap
import Col from "react-bootstrap/Col";

export interface ISellItemsProps {
	title: string;
	subtitle: string;
	image: string;
}

const SellItems: React.FC<ISellItemsProps> = (props) => {
	return (
		<Col md='4'>
			<div className='d-flex justify-content-center' style={{ padding: "20px 0" }}>
				<div className='d-flex pt-5'>
					<img className={classNames(s.sell_icons, "mr-3")} src={props.image} alt='' />
					<div>
						<h2 className='title_lower'>{props.title}</h2>
						<h3 className='mt-2 subtitle' style={{ color: "#A7C9FC" }}>
							{props.subtitle}
						</h3>
					</div>
				</div>
			</div>
		</Col>
	);
};

export { SellItems };
