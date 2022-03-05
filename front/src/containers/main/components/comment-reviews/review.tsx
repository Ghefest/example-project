import React from "react";
import s from "../../main.module.scss";
import classNames from "classnames";

import Col from "react-bootstrap/Col";

import { Popup } from "semantic-ui-react";

export interface IReviewProps {
	avatarImg: string;
	name: string;
	comment: string;
	mark: number;
	date: string;
}

enum MarkColor {
	Green = "#00DD66",
	Orange = "#FAAD14",
	Red = "#B1071C",
}

const Review: React.FC<IReviewProps> = (props) => {
	const { avatarImg, name, comment, mark, date } = props;

	const checkColorMark = (mark: number) => {
		switch (true) {
			case mark >= 8:
				return MarkColor.Green;
			case mark <= 7 && mark > 4:
				return MarkColor.Orange;
			default:
				return MarkColor.Red;
		}
	};

	return (
		<Col lg='4' md='6' sm='8'>
			<div className={classNames(s.reviews_box, "mt-5")}>
				<div>
					<img src={avatarImg} alt='' />
				</div>
				<div className={s.commentator_date}>
					<h2 className='title_lower'>{name}</h2>
					<Comment comment={comment} />
					<h5 className={classNames("text", s.date)}>{date}</h5>
				</div>
				<div>
					<p className={classNames(s.mark_box)}>
						<span style={{ color: checkColorMark(mark), fontSize: "20px" }}>{mark}</span>/10
					</p>
				</div>
			</div>
		</Col>
	);
};

const Comment: React.FC<{ comment: string }> = ({ comment }) => {
	const maxLength: number = 67;

	const commentPopupStyle = {
		border: "2px solid #0a4eb4",
		background: "#010122",
		color: "#72AAFF",
	};

	if (comment.length <= maxLength) {
		return (
			<h4 className='subtitle_lower' style={{ color: "#72AAFF" }}>
				{comment}
			</h4>
		);
	} else {
		return (
			<Popup
				trigger={
					<h4 className='subtitle_lower' style={{ color: "#72AAFF", cursor: "pointer" }}>
						{comment
							.split("")
							.slice(0, maxLength)
							.join("")}
						...
					</h4>
				}
				content={comment}
				style={commentPopupStyle}
				basic
			/>
		);
	}
};

export { Review };
