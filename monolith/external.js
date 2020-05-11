'use strict';

exports.acceptable = function(num_queens, queen_rows){
	for(var i = 0; i < num_queens; i++){
		for(var j = i + 1; j < num_queens; j++){
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
