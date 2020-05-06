'use strict';

var QUEEN_ROWS_PREFIX = "VALID QUEEN PLACEMENT: ";

var tools = require('./tools');

exports.acceptableMod = function(num_queens, queen_rows){
	var num_queens_tmp = num_queens;
	for(var i = 0; i < num_queens_tmp; i++){
		for(var j = i + 1; j < num_queens_tmp; j++){
			if(queen_rows[i] == queen_rows[j]){
				return false;
			}
			if(queen_rows[i] - queen_rows[j] == i - j || queen_rows[i] - queen_rows[j] == j - i){
				return false;
			}
		}
	}
	return true;
}

exports.fractionMod = function(event, res){
	var num_queens = parseInt(event.params.num_queens);
	var solutions = 0;
	for(var iter = parseInt(event.params.from); iter < parseInt(event.params.to); iter++){
		var code = iter;
	        var queen_rows = [];
	        for(var i = 0; i < num_queens; i++){
	                queen_rows[i] = code % num_queens;
	                code = Math.floor(code/num_queens);
	        }

		// call another function
		if(this.acceptableMod(num_queens, queen_rows)){
			// access to global variable and require package
			tools.printer(QUEEN_ROWS_PREFIX.concat(queen_rows));
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
