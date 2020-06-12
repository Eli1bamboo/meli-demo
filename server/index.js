const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	fetch = require('node-fetch');
app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.listen(4000, () => {
	console.log('server at port 4000');
});

function getItem(id) {
	const detailsUrls = [
		`https://api.mercadolibre.com/items/${id}`,
		`https://api.mercadolibre.com/items/${id}/description`
	];

	return Promise.all(
		detailsUrls.map(
			async (url) =>
				await fetch(url)
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						return data;
					})
					.catch((err) => {
						res.send({ err });
					})
		)
	);
}

app.post('/api/items', async function(req, res) {
	const keyword = req.body.search || '';
	const id = req.body.id || '';

	const searchUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${keyword}`;

	if (keyword) {
		const apiResponse = await fetch(searchUrl);

		return apiResponse
			.json()
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.send({ err });
			});
	}

	const item = await getItem(id);

	return res.send({ data: item[0], description: item[1] });
});
