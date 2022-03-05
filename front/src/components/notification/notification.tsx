import React from "react";

interface INotificationProps {
	type: "success" | "error";
	text: string;
}

export const Notification: React.FC<INotificationProps> = ({ type, text }) => {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<div
				style={{
					height: "2.8rem",
					width: "0.4rem",
					backgroundColor: type === "success" ? "#00DD66" : "#FF001F",
					borderRadius: "10px",
				}}
			/>
			<span style={{ paddingLeft: "0.7rem", color: "white" }}>{text}</span>
		</div>
	);
};
