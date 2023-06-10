import fs from 'fs'; // Работа с файловой системой

const priceByYear = async () => {
	// Директория, где лежат данные
	const marketDataDir = 'marketdata';

	// Названия папок захардкодим, чтобы не мучится
	const dirs = [
		'BBG004730JJ5_2018',
		'BBG004730JJ5_2019',
		'BBG004730JJ5_2020',
		'BBG004730JJ5_2021',
		'BBG004730JJ5_2022',
		'BBG004730JJ5_2023',
	];

	// Объект необходимый для создания таблицы
	const quotesByYear: {[key: string]: number} = {};

	// Пробегаемся по каждой необходимой дирректирии
	dirs.forEach((d) => {
		// Сумма цен котировок
		let result = 0;
		// Кол-во котировок
		let count = 0;

		// Получаем названия файлов в данной директории
		const files = fs.readdirSync(`${marketDataDir}/${d}`);

		// Пробегаемся по каждому файлу
		files.forEach(f => {
			// Если у нас формата .csv, то идем дальше
			if (f.includes('.csv')) {
				// Получаем содержимое файла
				const fileContent = fs.readFileSync(`${marketDataDir}/${d}/${f}`, 'utf8');
				// Разбиваем на массив строк вида 5e1c2634-afc4-4e50-ad6d-f78fc14a539a;2023-01-01T09:07:00Z;95.66;95.66;95.66;95.66;5;
				const quotes = fileContent.split('\n');

				// Пробегаемся по каждому значению, и находим Цену закрытия (4-ое значение)
				quotes.forEach(q => {
					// Из строки "a;b;c;d;e" получим массив [a, b, c, d, e]
					const value = q.split(';').filter(v => !!v);

					if (value.length) {
						// Цена закрытия - 4-ый элемент в массиве value
						const price = value[3];
						if (price) {
							// Плюсуем к результату, прибавляем кол-во котировок
							result += +price;
							count++;
						}
					}
				});
			}
		});

		// Просто парсим строку и получаем год (BBG004730JJ5_2023 -> 2023);
		const yearStr = d.split('_')[1];

		// Получаем среднее значение за год и округляем до 2-х знаков после запятой
		quotesByYear[yearStr] = +(result / count).toFixed(2);

	});

	return quotesByYear;
};

priceByYear()
	.then(console.log)
	.catch(console.log)
