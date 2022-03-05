interface IColors {
	border: string;
	background: string;
	buttonBackground: string;
	buttonBorder: string;
	buttonColor: string;
	boxShadow?: string;
}

const commonColors = {
	border: "#0D173A",
	background: "#01010C",
	buttonBackground: "#0F0F2D",
	buttonBorder: "white",
	buttonColor: "white",
};

const uncommonColors = {
	border: "#72AAFF",
	background: "#01010C",
	buttonBackground: "#0F0F2D",
	buttonBorder: "#72AAFF",
	buttonColor: "#72AAFF",
};

const rareColors = {
	border: "#0047FF",
	background: "#01010C",
	buttonBackground: "#0F0F2D",
	buttonBorder: "#0047FF",
	buttonColor: "#0047FF",
};

const mythicalColors = {
	border: "#9919FE",
	background: "#01010C",
	buttonBackground: "#0F0F2D",
	buttonBorder: "#9919FE",
	buttonColor: "#9919FE",
};

const legendaryColors = {
	border: "#FF00F5",
	background: "#01010C",
	buttonBackground: "#0F0F2D",
	buttonBorder: "#FF00F5",
	buttonColor: "#FF00F5",
};

const ancientColors = {
	border: "#FF001F",
	background: "#0B0001",
	buttonBackground: "#FF001F",
	buttonBorder: "#FF001F",
	buttonColor: "#0F0F2D",
	boxShadow: "0px 0px 7px rgba(255, 0, 31, 0.4)",
};

const immortalColors = {
	border: "#FAAD14",
	background: "#000B05",
	buttonBackground: "#FAAD14",
	buttonBorder: "#FAAD14",
	buttonColor: "#0F0F2D",
	boxShadow: "0px 0px 7px rgba(250, 173, 20, 0.31)",
};

const arcanaColors = {
	border: "#ade55c",
	background: "#011910",
	buttonBackground: "#ade55c",
	buttonBorder: "#ade55c",
	buttonColor: "#0F0F2D",
	boxShadow: "0px 0px 7px rgba(173, 229, 92, 0.4)",
};

export const rarityToColors = new Map<string, IColors>();
rarityToColors.set("Base Grade", commonColors);

rarityToColors.set("Consumer Grade", commonColors);
rarityToColors.set("Industrial Grade", uncommonColors);
rarityToColors.set("Mil-Spec Grade", rareColors);
rarityToColors.set("Restricted", mythicalColors);
rarityToColors.set("Classified", legendaryColors);
rarityToColors.set("Covert", ancientColors);
rarityToColors.set("Contraband", immortalColors);

rarityToColors.set("Distinguished", rareColors);
rarityToColors.set("Exceptional", mythicalColors);
rarityToColors.set("Superior", legendaryColors);
rarityToColors.set("Master", ancientColors);

rarityToColors.set("High Grade", rareColors);
rarityToColors.set("Remarkable", mythicalColors);
rarityToColors.set("Exotic", legendaryColors);
rarityToColors.set("Extraordinary", ancientColors);

rarityToColors.set("Common", commonColors);
rarityToColors.set("Uncommon", uncommonColors);
rarityToColors.set("Rare", rareColors);
rarityToColors.set("Mythical", mythicalColors);
rarityToColors.set("Legendary", legendaryColors);
rarityToColors.set("Ancient", ancientColors);
rarityToColors.set("Arcana", arcanaColors);
rarityToColors.set("Immortal", immortalColors);
