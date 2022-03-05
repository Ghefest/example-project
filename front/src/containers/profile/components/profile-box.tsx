import React from "react";
import s from "../profile.module.scss";
import classNames from "classnames";

import { useSelector } from "react-redux";
import { SelectAvatar, SelectCreatedAt, SelectTradeOfferLink, SelectUsername } from "../../../store";

interface IProfileBoxProps {
	experience: string;
	funds: number;
}

const ProfileBox: React.FC<IProfileBoxProps> = ({ experience, funds }) => {
	const avatar = useSelector(SelectAvatar);
	const name = useSelector(SelectUsername);
	const createdAt = useSelector(SelectCreatedAt);
	const tradeOfferLink = useSelector(SelectTradeOfferLink);

	return (
		<div className={s.profile_box}>
			<h1 className={classNames(s.title, "title")}>
				Ваш профиль
				<div className='strip' style={{ width: "13%" }}></div>
			</h1>

			<div className={s.profile_content}>
				<div className={s.profile_info}>
					<img src={avatar} width='80' alt='' className={s.avatar_img} />
					<div className='ml-3'>
						<div className='d-flex flex-column'>
							<div className='d-flex align-items-center'>
								<p className={s.username}>{name}</p>
								<div className={s.experience_box}>
									<p className={s.text}>{experience}</p>
								</div>
							</div>
							<p className={s.withdrawn_funds}>Всего выведено средств {funds} $</p>
							<p className='text mt-1'>Дата регистрации {new Date(createdAt).toLocaleDateString()}</p>
						</div>
					</div>
				</div>

				<form className='d-flex flex-column'>
					<label htmlFor='tradeLink'>Ваша трейд ссылка Steam</label>
					<input type='text' className={s.input} placeholder='Link you' value={tradeOfferLink} />
				</form>
			</div>
		</div>
	);
};

export { ProfileBox };
