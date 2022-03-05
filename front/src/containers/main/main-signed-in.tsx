import React from "react";
import s from "./main.module.scss";
import classNames from "classnames";
import Row from "react-bootstrap/Row";
import { Bonus } from "./components/bonus/bonus";
import { SellSkinsForm } from "./components/sell-skin-form/sell-skins-form";
import { SelectSalesSum } from "../../store";
import { useSelector } from "react-redux";
import { LiveTrades } from "./components/live-trade/live-trades";

interface IMainSignedInProps {}

const MainSignedIn: React.FC<IMainSignedInProps> = () => {
	const totalSoldFor = useSelector(SelectSalesSum);

	return (
		<div id='sell-your-skins' className={classNames(s.main)}>
			<div className='container'>
				<h1 className='text-center title'>
					Продавайте свои скины
					<div className='strip' style={{ width: "20%", margin: "10px auto 0px auto" }}></div>
				</h1>
				<SellSkinsForm />

				<h1 className='text-center title retreat'>
					<img src='/images/main/polygon.png' alt='' className={s.title_polygon} />
					Продают сейчас
					<img src='/images/main/polygon.png' alt='' className={s.title_polygon} />
					<div className='strip' style={{ width: "25%", margin: "0 auto" }}></div>
				</h1>
				<Row>
					<LiveTrades />
				</Row>

				<h1 className='title retreat'>
					Бонусы от продажи
					<div className='strip' style={{ width: "24%" }}></div>
				</h1>
				<h3 className='subtitle' style={{ width: "100%", color: "#fff", maxWidth: "540px" }}>
					Продавайте свои предметы и накапливайте бонус от продажи. Чем больше вы продаете, тем больше получаете
					бонусов!
				</h3>

				<Bonus totalSoldFor={totalSoldFor} />
			</div>
		</div>
	);
};

export { MainSignedIn };
