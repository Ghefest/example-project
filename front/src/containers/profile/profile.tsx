import React from "react";
import "./profile-clean.scss";

import { PersonalData } from "./components/personal-data";
import { ReferralLink } from "./components/referral-links";
import { ProfileMoneyInfo } from "./components/profile-money-info";
import { ProfileBox } from "./components/profile-box";
import { ProfileStatistic } from "./components/profile-statistic";
import { ProfileMoneyDeal } from "./components/profile-money-deal";

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
	return (
		<div className='container profile_page_container'>
			<ProfileBox experience='Молодняк' funds={4331} />
			<PersonalData />
			<ReferralLink />
			<ProfileMoneyInfo totalEarned={98} salePercent={2} invitedPercent={1} />
			<ProfileStatistic />
			<ProfileMoneyDeal />
		</div>
	);
};

export { Profile };
