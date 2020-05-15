'use strict';

const _ = require('lodash')

exports.acceptable = async function (num_queens, queen_rows){
	let solution = await (new (require('aws-sdk'))
		        .Lambda({ region: 'eu-central-1', /* Your access key and secret access key */ }))
	                .invoke({
			        FunctionName: "node2faas-acceptable",
				Payload: JSON.stringify({
					num_queens: num_queens,
					queen_rows: queen_rows
				})
			})
	                .promise().then(p => p.Payload)
	return solution;
}
this.acceptable(9, [4, 6, 8, 3, 1, 7, 5, 2, 0]).then(console.log);
