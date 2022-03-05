import React, { useEffect, useState } from "react";
import { SellApi } from "../../../../api";
import { LiveTrade } from "./live-trade";
import socketIOClient from "socket.io-client";
import { config } from "../../../../config";

const LiveTrades: React.FC<{}> = () => {
	const [items, setItems] = useState<any[]>([]);

	const updateItems = (newItems: any[]) => {
		const _items = [...items];
		_items.unshift(...newItems);
		setItems(_items.splice(0, 6));
	};

	useEffect(() => {
		SellApi.getLastItemsOfCompletedSells().then((items) => updateItems(items));

		const socket = socketIOClient(config.apiWsUrl + "/sell", { multiplex: false, transports: ["websocket"] });
		socket.on("selling-right-now", ({ items }: any) => updateItems(items));

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<>
			{items.map((item: any) => {
				return <LiveTrade key={item.id} {...item} />;
			})}
		</>
	);
};

export { LiveTrades };
