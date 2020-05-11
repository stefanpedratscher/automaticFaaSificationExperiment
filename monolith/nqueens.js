'use strict';

var external = require('./external');

exports.fraction = function(event, res){
	var from = parseInt(event.params.from);
	var to = parseInt(event.params.to);
	var num_queens = parseInt(event.params.num_queens);
	var solutions = 0;
	for(var iter = from; iter < to; iter++){
		var code = iter;
	        var queen_rows = [];
	        for(var i = 0; i < num_queens; i++){
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

var res = this.fraction({params: {from: from, to: to, num_queens: num_queens}});
console.log(res);
