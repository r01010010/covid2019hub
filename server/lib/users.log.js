const log = {
	create: () => {
		console.log('Saving user ...');
	},
	create_error: (err) => {
		console.log('Error at saving');
		console.log(err);
	}
}

module.exports = log;
