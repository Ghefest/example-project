import React from "react";
import s from "./support.module.scss";

import { WorksWrapper } from "./components/works";
import { QuestionWrapper } from "./components/questions";
import { WriteFormWrapper } from "./components/write-form-wrapper";

export interface ISupportPageProps {}

const SupportPage: React.FC<ISupportPageProps> = React.memo(() => {
	return (
		<div className={s.support_page_wrapper}>
			<div className='container'>
				<WorksWrapper />
				<QuestionWrapper />
				<WriteFormWrapper />
			</div>
		</div>
	);
});

export { SupportPage };
