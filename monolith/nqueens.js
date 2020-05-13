'use strict';

const _ = require('lodash')

var external = require('./external');

exports.fraction = async function(ev, res){
	var from = parseInt(ev.params.from);
	var to = parseInt(ev.params.to);
	var num_queens = parseInt(ev.params.num_queens);
	var solutions = 0;
	for(var iter of _.range(from, to)){
		var code = iter;
	        var queen_rows = [];
	        for(var i of _.range(0, num_queens)){
	                queen_rows[i] = code % num_queens;
	                code = Math.floor(code/num_queens);
	        }
		// call frunction another file
		if(external.acceptable(num_queens, queen_rows)){
			// TODO call npm package
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

this.fraction({params: {from: from, to: to, num_queens: num_queens}})
	.then(console.log)
