const axios = require('axios');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
	console.log(`Node Server`);
});

app.get('/verifypayment', async (req, res) => {
	try {
		const { token, amount } = req.body;
		let data = {
			token: token,
			amount: amount,
		};
		let config = {
			headers: {
				Authorization: process.env.private_key,
			},
		};

		const resp = await axios.post(
			'https://khalti.com/api/v2/payment/verify/',
			data,
			config
		);
		res.send(resp.data);
	} catch (e) {
		res.send(e);
	}
});
