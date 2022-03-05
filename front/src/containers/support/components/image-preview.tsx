import React from "react";
import s from "../support.module.scss";
import { ReactComponent as CloseCircle } from "../../../images/all/close-circle.svg";

interface IImagePreviewProps {
	image: File;
	onDelete: () => void;
}

export const ImagePreview: React.FC<IImagePreviewProps> = ({ image, onDelete }) => {
	return (
		<div className={s.image_preview_container}>
			<img src={URL.createObjectURL(image)} />
			<CloseCircle className={s.close_icon} onClick={onDelete} />
		</div>
	);
};
