import React from "react";
import s from "../support.module.scss";

import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface IQuestionWrapperProps {}

const QuestionWrapper: React.FC<IQuestionWrapperProps> = () => {
	return (
		<div className={s.question_wrapper}>
			<h1 className='title'>
				Часто задаваемые вопросы
				<div className='strip mt-3' style={{ width: "30%" }}></div>
			</h1>

			<Tab.Container defaultActiveKey='first'>
				<Row className='pt-5 justify-content-between'>
					<Col lg={4} sm={6} xs={12}>
						<Nav variant='pills' className='flex-column'>
							<Nav.Item>
								<Nav.Link eventKey='first'>
									<p className='subtitle_lower'>Как обменять баланс на предметы</p>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey='second'>
									<p className='subtitle_lower'>Почему при выводи скина не приходит обмен в мой аккаунт стим?</p>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey='third'>
									<p className='subtitle_lower'>Почему не приходят деньги на баланс с продажи скинов?</p>
								</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Nav.Link eventKey='fourth'>
									<p className='subtitle_lower'>У сайта есть группы в социальных сетях</p>
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					<Col lg={7} sm={6} xs={12}>
						<Tab.Content className={s.content}>
							<p className='subtitle pb-3' style={{ color: "#fff" }}>
								Решение:
							</p>
							<Tab.Pane eventKey='first'>
								<p className='subtitle_lower'>1. Бла бла бла</p>
								<p className='subtitle_lower'>2. Тыры Пыры</p>
								<p className='subtitle_lower'>3. Я хз</p>
							</Tab.Pane>
							<Tab.Pane eventKey='second'>
								<p className='subtitle_lower'>1. Може тебе показалось?</p>
								<p className='subtitle_lower'>2. Думаю да, тебе показалось</p>
								<p className='subtitle_lower'>3. Я хз</p>
							</Tab.Pane>
							<Tab.Pane eventKey='third'>
								<p className='subtitle_lower'>1. Не накручывай себя </p>
								<p className='subtitle_lower'>2. Ты преувеличиваешь </p>
								<p className='subtitle_lower'>3. Я хз</p>
							</Tab.Pane>

							<Tab.Pane eventKey='fourth'>
								<p className='subtitle_lower'>Тут будут линкс на соц сети</p>
							</Tab.Pane>

							<p className='comments_text pt-3'>
								Если вы не нашли решения своей проблемы,{" "}
								<a href='#write_to_support' className={s.link}>
									напишите в поддержку
								</a>
							</p>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);
};

export { QuestionWrapper };
