'use strict';

const _ = require('lodash')

var external = require('./external');

exports.fractionMod = function(event, res){
	var num_queens = parseInt(event.params.num_queens);
	var solutions = 0;
	for(var iter=parseInt(event.params.from); iter<parseInt(event.params.to); iter++){
		var code = iter;
	        var queen_rows = [];
	        for(var i of _.range(0, num_queens)){
	                queen_rows[i] = code % num_queens;
	                code = Math.floor(code/num_queens);
	        }
		// call frunction another file
		if(external.acceptable(num_queens, queen_rows)){
			console.log(queen_rows);
		        solutions += 1;
		}
	}
	return solutions;
}

var num_queens = -1;
var from = -1;
var to = -1;
var args = process.argv;
if(args.length > 4){
	num_queens = parseInt(args[2]);
	from = parseInt(args[3]);
	to = parseInt(args[4]);
	//console.log("Setting num_queens=", num_queens, ", from", from, ", to=", to);
}

var res = this.fractionMod({params: {from: from, to: to, num_queens: num_queens}});
console.log(res);
