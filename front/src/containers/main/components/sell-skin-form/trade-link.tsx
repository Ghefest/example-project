import React, { useState } from "react";
import s from "../../main.module.scss";
import classNames from "classnames";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SelectTradeOfferLink, UserActions } from "../../../../store";
import * as Yup from "yup";
import { Button, Image, Loader, Popup } from "semantic-ui-react";
import question from "../../../../images/all/question.png";
import { ReactComponent as ExclamationMark } from "../../../../images/all/Exclamation-mark.svg";
import { ReactComponent as SuccessCheckMark } from "../../../../images/main/success-check-mark.svg";
import { UserApi } from "../../../../api";

interface ITradeLinkProps {}

const TradeOfferLinkSchema = Yup.object().shape({
	tradeOfferLink: Yup.string()
		.required()
		.url()
		.min(15),
});

const TradeLink: React.FC<ITradeLinkProps> = React.memo(() => {
	const dispatch = useDispatch();
	const tradeOfferLink = useSelector(SelectTradeOfferLink);
	const [isSaving, setIsSaving] = useState(false);
	const [isSavedLink, setIsSavedLink] = useState(false);

	const formik = useFormik({
		initialValues: {
			tradeOfferLink,
		},
		validationSchema: TradeOfferLinkSchema,
		onSubmit: ({ tradeOfferLink }, actions) => {
			setIsSaving(true);
			UserApi.updateTradeOfferLink({ tradeOfferLink })
				.then(() => {
					dispatch(UserActions.updateTradeOfferLink(tradeOfferLink));
					setIsSavedLink(true);
				})
				.catch(() => actions.setErrors({ tradeOfferLink: "error" }))
				.finally(() => setIsSaving(false));
		},
	});

	const tradeLinkPopupStyle = {
		border: "2px solid #0a4eb4",
		background: "#010122",
		color: "#cce0ff",
	};

	const questionIconStyle = { cursor: "pointer" };

	const showLoadingMessage = () => isSaving;
	const showErrorMessage = () => formik.errors.tradeOfferLink;
	const showSuccessMessage = () => isSavedLink;
	const showSaveButton = () => {
		return (
			formik.values.tradeOfferLink !== tradeOfferLink && !formik.errors.tradeOfferLink && !isSavedLink && !isSaving
		);
	};

	const onSuccessMessageClick = () => setIsSavedLink(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsSavedLink(false);
		formik.handleChange(e);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<h2 className='title_lower'>
				Ваши предметы
				<div className={s.strip_x}></div>
			</h2>

			<div className={s.input_container}>
				<div className='d-flex align-items-center'>
					<label htmlFor='tradeOfferLink'>Ссылка на обмен</label>
					<Popup
						className='trade_link'
						content={<PopUpContent />}
						trigger={<Image src={question} style={questionIconStyle} className='mb-2 ml-2' />}
						style={tradeLinkPopupStyle}
						position='top center'
						on='click'
					/>
				</div>
				<div
					className={classNames(s.input_container_trade_offer_link, {
						[s.input_container_trade_offer_link_incorrect_link]: formik.errors.tradeOfferLink,
					})}
				>
					<input
						className={classNames(s.input, s.input_trade_offer_link)}
						id='tradeOfferLink'
						name='tradeOfferLink'
						type='text'
						placeholder={"Link you"}
						onChange={onChange}
						value={formik.values.tradeOfferLink}
						disabled={isSaving}
					/>
					{showLoadingMessage() && <Message text='' type='loading' />}
					{showErrorMessage() && <Message text='Неверная ссылка' type='error' />}
					{showSuccessMessage() && <Message text='Ссылка сохранена' type='success' onClick={onSuccessMessageClick} />}
					{showSaveButton() && <SaveButton />}
				</div>
			</div>
		</form>
	);
});

const PopUpContent = () => {
	const hereTextStyle = {
		color: "#00DD66",
		cursor: "pointer",
	};

	const steamTradeOfferUrlLink = "http://steamcommunity.com/my/tradeoffers/privacy";

	return (
		<span>
			Нажмите{" "}
			<a style={hereTextStyle} href={steamTradeOfferUrlLink} target='_blank'>
				тут
			</a>
			, прокрутите вниз. Скопируйте ссылку обмена и вставьте в поле ниже.
		</span>
	);
};

const Message: React.FC<{ text: string; type: "loading" | "error" | "success"; onClick?: () => void }> = ({
	text,
	type,
	onClick,
}) => {
	return (
		<div className={s.input_trade_offer_link_error} onClick={onClick}>
			<span
				className={classNames(s.input_container_trade_offer_link_message_text, {
					[s.input_container_trade_offer_link_message_text_loading]: type === "loading",
					[s.input_container_trade_offer_link_message_text_error]: type === "error",
					[s.input_container_trade_offer_link_message_text_success]: type === "success",
				})}
			>
				{text}
			</span>
			{type === "loading" && <Loader active inline size='small' style={{ marginRight: "0.8rem" }} />}
			{type === "error" && <ExclamationMark className={s.input_container_trade_offer_link_exclamation_mark} />}
			{type === "success" && <SuccessCheckMark className={s.input_container_trade_offer_link_exclamation_mark} />}
		</div>
	);
};

const SaveButton = () => {
	return (
		<Button className={s.save_trade_offer_link_button} type='submit'>
			СОХРАНИТЬ
		</Button>
	);
};

export { TradeLink };
