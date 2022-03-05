import React from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";
import close from "../../images/main/modal/close.svg";

export interface ICustomModalProps {
	className?: string;
	scroll?: boolean;
	center?: boolean;
	modalOutsideClose?: boolean;
	blackoutBg?: boolean;
	displayCloseBtn?: boolean;

	isOpen: boolean;
	onClose: Function;
}

const CustomModal: React.FC<ICustomModalProps> = (props) => {
	const {
		isOpen,
		children,
		onClose,
		className,
		scroll,
		center,
		modalOutsideClose,
		blackoutBg,
		displayCloseBtn,
	} = props;

	if (!isOpen) return <></>;

	const checkScroll = (scroll: boolean = false) => (!scroll ? "" : "scroll");
	const checkModalPos = (center: boolean = true) => (!center ? "baseline" : "center");
	const checkOutsideOpen = (close: boolean = true) => (!close ? (e: any) => e.stopPropagation() : () => onClose());
	const checkBlackoutBg = (bg: boolean = true) => (!bg ? "inherit" : "#00000080");
	const checkDisplayCloseBtn = (btn: boolean = true) => (!btn ? "none" : "");

	return (
		<div
			className={classNames(styles.modal)}
			style={{
				overflow: checkScroll(scroll),
				alignItems: checkModalPos(center),
				background: checkBlackoutBg(blackoutBg),
			}}
			onClick={checkOutsideOpen(modalOutsideClose)}
		>
			<div className={classNames(styles.modal_content, className)} onClick={(e) => e.stopPropagation()}>
				<button
					className={styles.close_btn}
					style={{ display: checkDisplayCloseBtn(displayCloseBtn) }}
					onClick={() => onClose()}
				>
					<img src={close} alt='' />
				</button>
				{children}
			</div>
		</div>
	);
};

export { CustomModal };
