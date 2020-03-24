const _ = require('lodash');

const apiResponse = (options) => {
  const { validate, logic, formatRes, req, res } = options;

	if (!validate(req)) {
		res.status(400);
		return res.json({
			err: new Error('Invalid request')
		});
  }

  logic(req, res, (err, data) => {

    if (err) {
      console.log('Oops error ...');
      console.log(err);
    } else {
      console.log('OK! ...');
      console.log(data);
    }

		if (err) {
			res.status(500);
			res.json({err: err});
		}else if(!data || data.length === 0){
			res.status(400);
			res.json({err: new Error('Nothing was done or modified')});
		}else{
			if(_.isString(data)){
				res.status(403);
				res.json({
					tryresolution: data
				});
			}else{
				res.json(formatRes(data));
			}
		}
	});
};

module.exports = apiResponse;
