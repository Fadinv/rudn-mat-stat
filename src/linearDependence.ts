const linearDependence = async () => {
	const quotesByYear = {
		'2018': 103.2,
		'2019': 93.48,
		'2020': 129.99,
		'2021': 170.13,
		'2022': 97.42,
		'2023': 110.22
	};

	let tSumm = 0;
	let ySumm = 0;
	let t2Summ = 0;
	let tySumm =0;

	Object.keys(quotesByYear).forEach((year) => {
		if (!quotesByYear.hasOwnProperty(year)) return;

		if (!year) return;

		const price: number = quotesByYear[year as keyof typeof quotesByYear];
		if (!price) return;
		tSumm += +year;
		ySumm += price;
		t2Summ += (+year) ** 2;
		tySumm += price * +year;
	});

	console.log('Сумма лет = ', tSumm);
	console.log('Сумма цен акций = ', ySumm);
	console.log('Сумма квадрата лет = ', t2Summ);
	console.log('Сумма произведений y * t = ', tySumm);
};

linearDependence()
	.catch(console.log);