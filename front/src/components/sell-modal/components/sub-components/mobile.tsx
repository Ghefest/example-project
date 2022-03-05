import React from "react";
import s from "./mobile.module.scss";

import { MobileHeader } from "./mobile-header";
import { MobileSubHeader } from "./mobile-sub-header";
import { useSelector } from "react-redux";
import { SelectAvatar } from "../../../../store/user";

interface IMobilesProps {
	items: any[];
	botAvatar: string;
	itemImg: string;
}

const Mobiles: React.FC<IMobilesProps> = (props) => {
	const { botAvatar, itemImg, items } = props;
	const avatar = useSelector(SelectAvatar);

	return (
		<div className={s.mobile_content}>
			<div className={s.mobile_box}>
				<MobileHeader />
				<MobileSubHeader />
				<div className={s.mobile_inner}>
					<img src={avatar} className={s.profile_photo} alt='' />
				</div>
			</div>

			<div className={s.mobile_box}>
				<MobileHeader />
				<div className={s.mobile_inner}>
					<div className='d-flex align-items-center'>
						<img src={avatar} className={s.profile_photo} alt='' />
						<h5 className='comments_text m-0 ml-2' style={{ fontSize: "12px" }}>
							Ваше предложение:
						</h5>
					</div>
					<div className='d-flex align-items-center justify-content-center'>
						{items.map((item, i) => {
							return <img key={i} src={item.image} className={s.item} alt='' />;
						})}
					</div>
					<div className='d-flex align-items-center justify-content-center'>
						<img src='./images/sell/icons/exchange.png' className='mt-1 mb-1' alt='' />
					</div>

					<div className='d-flex align-items-center'>
						<img src={botAvatar} className={s.profile_photo} alt='' />
						<h5 className='comments_text m-0 ml-2' style={{ fontSize: "12px" }}>
							За предметы:
						</h5>
					</div>
					<div className='d-flex align-items-center justify-content-center'>
						<img src={itemImg} className={s.item} alt='' />
					</div>
				</div>
				<div className={s.confirm_buttons_pos}>
					<button>Отмена</button>
					<button>Отправить</button>
				</div>
			</div>
		</div>
	);
};

export { Mobiles };
