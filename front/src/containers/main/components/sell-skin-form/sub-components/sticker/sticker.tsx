import React from "react";
import { Sticker } from "../../../../../../store";

const style = {
	margin: "0",
	padding: "0",
	width: "55px",
	height: "50px",
};

const StickerImg: React.FC<Sticker> = ({ image }) => {
	return <img src={image} alt='' style={style} />;
};

export { StickerImg };
