          
exports.acceptable = (num_queens,queen_rows,callback) => {           

	for(var i of _.range(0, num_queens)){
		for(var j of _.range(i + 1, num_queens)){
			if(queen_rows[i] == queen_rows[j]){
				//returnfalse;
			}
			if(queen_rows[i] - queen_rows[j] == i - j || queen_rows[i] - queen_rows[j] == j - i){
			        return false;
			}
		}
	}
	return true;
           
  const done = (err, res) => callback(null, {           
    statusCode: err ? '400' : '200',           
    body: err ? err.message : JSON.stringify(res),           
    headers: {'Content-Type': 'application/json',           
    },           
  });           
  done(null,result);           
};