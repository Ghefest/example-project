import React from "react";
import s from "../support.module.scss";
import classNames from "classnames";
import { Button, Icon } from "semantic-ui-react";
import { FileInput } from "./file-input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ImagePreview } from "./image-preview";
import { SupportLetterApi } from "../../../api";
import { toast } from "react-toastify";
import { Notification } from "../../../components";

const ContactFrom: React.FC = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			subject: "",
			message: "",
			image: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(`Неверный E-mail.`)
				.required("Обязательное поле."),
			subject: Yup.string()
				.required("Обязательное поле.")
				.max(30, `Количество символов не должно превышать 30.`),
			message: Yup.string()
				.required("Обязательное поле.")
				.max(255, `Количество символов не должно превышать 255.`),
		}),
		onSubmit: (values, helpers) => {
			SupportLetterApi.create(values)
				.then(() =>
					toast.success(<Notification type={"success"} text={"Письмо отправлено."} />, {
						style: { backgroundColor: "#0D173A" },
					}),
				)
				.catch(() => {
					toast.error(<Notification type={"error"} text={"Произошла ошибка. Попробуйте позже."} />, {
						style: { backgroundColor: "#0D173A" },
					});
				})
				.finally(() => helpers.resetForm());
		},
	});

	const onImageDelete = () => {
		formik.setFieldValue("image", null);
	};

	const isTextInputsDisabled = () => formik.isSubmitting;

	const isTextAreaDisabled = () => {
		const { email, subject } = formik.values;
		const { email: e, subject: s } = formik.errors;

		return !email.length || !subject.length || !!e?.length || !!s?.length || formik.isSubmitting;
	};

	const isButtonDisabled = () => {
		const { email, subject, message } = formik.values;
		const { email: e, subject: s, message: m } = formik.errors;

		return (
			!email.length ||
			!message.length ||
			!subject.length ||
			!!e?.length ||
			!!s?.length ||
			!!m?.length ||
			formik.isSubmitting
		);
	};

	return (
		<form onSubmit={formik.handleSubmit} className={s.form}>
			<div className='d-flex flex-column justify-content-start'>
				<div className={s.input_container}>
					<TextInput
						formik={formik}
						formikValueKey={"email"}
						type={"email"}
						label={"Почта для связи"}
						placeholder={"E-mail"}
						isWide={false}
						As='input'
						isDisabled={isTextInputsDisabled()}
					/>
				</div>
				<div className={s.input_container}>
					<TextInput
						formik={formik}
						formikValueKey={"subject"}
						type={"text"}
						label={"Тема письма"}
						placeholder={"Не могу продать скины"}
						As='input'
						isDisabled={isTextInputsDisabled()}
					/>
				</div>
				<div className={s.input_container}>
					<TextInput
						formik={formik}
						formikValueKey={"message"}
						label={"Текст письма"}
						placeholder={"Подробное описание проблемы"}
						As='textarea'
						isWide={true}
						isDisabled={isTextAreaDisabled()}
					>
						{formik.values.image && (
							<ImagePreview image={(formik.values.image as unknown) as File} onDelete={onImageDelete} />
						)}
					</TextInput>
				</div>
				<div className={classNames(s.input_container)}>
					<FileInput formik={formik} />
				</div>
				<Button
					animated='vertical'
					className={classNames("mt-3", s.send_button, { [s.send_button_disabled]: isButtonDisabled() })}
					type='submit'
					color='blue'
					size='large'
					style={{ width: "190px" }}
					disabled={isButtonDisabled()}
				>
					<Button.Content hidden>
						<Icon name='envelope' />
					</Button.Content>
					<Button.Content visible>Отправить письмо</Button.Content>
				</Button>
			</div>
		</form>
	);
};

const TextInput: React.FC<{
	formik: any;
	formikValueKey: string;
	label: string;
	placeholder: string;
	isWide?: boolean;
	type?: string;
	As: "input" | "textarea";
	isDisabled?: boolean;
}> = ({ formik, formikValueKey, label, placeholder, isWide, type, As, children, isDisabled }) => {
	return (
		<>
			<label htmlFor={formikValueKey}>{label}</label>
			<div style={{ position: "relative" }}>
				<As
					id={formikValueKey}
					type={type}
					name={formikValueKey}
					className={classNames(s.input, { [s.input_text]: isWide, [s.input_text_disabled]: isDisabled })}
					placeholder={placeholder}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values[formikValueKey]}
					disabled={isDisabled}
				/>
				{children}
			</div>
			{formik.touched[formikValueKey] && formik.errors[formikValueKey] && (
				<div>
					<p className={classNames("text_lower mt-2", s.error_message)}>{formik.errors[formikValueKey]}</p>
				</div>
			)}
		</>
	);
};

export { ContactFrom };
