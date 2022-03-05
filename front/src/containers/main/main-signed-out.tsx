import React from "react";
import s from "./main.module.scss";
import classNames from "classnames";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button } from "semantic-ui-react";

import { SELL_FOR_MONEY } from "./components/sell-for-money/sell-for-moneys";
import { SellForMoney } from "./components/sell-for-money/sell-for-money";

import { ADVANTAGES } from "./components/advantages/advantages";
import { Advantage } from "./components/advantages/advantage";

import { SELL_ITEMS } from "./components/sell-items/sell-items";
import { SellItems } from "./components/sell-items/sell-item";

import { Review } from "./components/comment-reviews/review";
import { REVIEWS } from "./components/comment-reviews/reviews";
import { LiveTrades } from "./components/live-trade/live-trades";

interface IMainSignedOutProps {}

const MainSignedOut: React.FC<IMainSignedOutProps> = () => {
	return (
		<div className={classNames(s.main)}>
			<div className='container'>
				<Row className='justify-content-between mt-5'>
					<Col lg='8' sm='6' className='pt-5'>
						{SELL_FOR_MONEY.map((sell, index) => (
							<SellForMoney key={index} {...sell} />
						))}
					</Col>
					<Col sm='4' xs='12'>
						{ADVANTAGES.map((advantage, index) => (
							<Advantage key={index} {...advantage} />
						))}
					</Col>
					<Col lg='3' xs='5'>
						<Button
							className='d-flex justify-content-center align-items-center'
							color='blue'
							href='http://localhost:3005/api/auth/steam'
							style={{ minHeight: "60px" }}
							animated
							fluid
						>
							<Button.Content visible>Войти через Steam</Button.Content>
							<Button.Content hidden>Вход туть!</Button.Content>
						</Button>
					</Col>
				</Row>

				<h1 className='text-center title retreat'>
					<img src='/images/main/polygon.png' alt='' />
					Продают сейчас
					<img src='/images/main/polygon.png' alt='' />
					<div className='strip' style={{ width: "25%", margin: "0 auto" }}></div>
				</h1>
				<Row>
					<LiveTrades />
				</Row>

				<h1 className='title retreat'>
					Как продавать вещи?
					<div className='strip' style={{ width: "25%" }}></div>
				</h1>

				<Row className='justify-content-center'>
					{SELL_ITEMS.map((sellitem, index) => (
						<SellItems key={index} {...sellitem} />
					))}
				</Row>

				<h1 className='retreat title text-right'>Отзывы о нас</h1>
				<div className='strip' style={{ width: "15%", float: "right" }}></div>

				<Row className='justify-content-center mt-5'>
					{REVIEWS.map((reviews, index) => (
						<Review key={index} {...reviews} />
					))}
				</Row>
			</div>
		</div>
	);
};

export { MainSignedOut };
