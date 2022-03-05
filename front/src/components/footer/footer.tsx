import React from "react";
import s from "./footer.module.scss";
import classNames from "classnames";

export interface IFooterProps {}

const Footer: React.FC<IFooterProps> = (props) => {
	return (
		<footer>
			<div className='container'>
				<div className={classNames(s.footer)}>
					<div className={classNames(s.link_container)}>
						<div className={classNames(s.link_box)}>
							<a href='/#' className={classNames(s.link)}>
								Поддержка
							</a>
							<a href='/#' className={classNames(s.link)}>
								Как это работает?
							</a>
							<a href='/#' className={classNames(s.link)}>
								FAQ
							</a>
							<a href='/#' className={classNames(s.link)}>
								Написать в поддержку
							</a>
						</div>

						<div className={classNames(s.link_box)}>
							<a href='/#' className={classNames(s.link)}>
								Главная
							</a>
							<a href='#sell-your-skins' className={classNames(s.link)}>
								Продать скины
							</a>
							<a href='/#' className={classNames(s.link)}>
								Отзывы о нас
							</a>
						</div>

						<div className={classNames(s.link_box)}>
							<a href='/#' className={classNames(s.link)}>
								Реферальная система
							</a>
							<a href='/#' className={classNames(s.link)}>
								Инструкция по системе
							</a>
							<a href='/#' className={classNames(s.link)}>
								Мои рефералы
							</a>
						</div>
					</div>

					<div className={classNames(s.link_box)}>
						<p>Мы есть в социальных сетях</p>
						<div className={classNames(s.social_link_box)}>
							<a href='/#'>
								<img src='/images/footer/vk.png' alt='' />
							</a>
							<a href='/#'>
								<img src='/images/footer/facebook.png' alt='' />
							</a>
							<a href='/#'>
								<img src='/images/footer/instagram.png' alt='' />
							</a>
						</div>
						<p>
							Напишите нам на почту:
							<a href='/#' className='ml-2' style={{ color: "#00DD66" }}>
								Skins_Top@gmail.com
							</a>
						</p>
					</div>
				</div>
			</div>

			<div>
				<p className='text-center' style={{ color: "#08306C" }}>
					Все права, на использование, хранение и обработку - защищены.
				</p>
			</div>
		</footer>
	);
};

export { Footer };
