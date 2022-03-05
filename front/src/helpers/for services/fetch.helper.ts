const defaultHeaders = () => {
	return { Accept: "application/json", "Content-Type": "application/json" };
};

const handleResponse = (response: Response): any => {
	return new Promise(async (resolve, reject) => {
		const data = await response.json();
		if (!data.isSuccess) {
			if ([401, 403].indexOf(data?.code) !== -1) {
			}
			reject(data);
		} else {
			resolve(data.data);
		}
	});
};

export { defaultHeaders, handleResponse };
