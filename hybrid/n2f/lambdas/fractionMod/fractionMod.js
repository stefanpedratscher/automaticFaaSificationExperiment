          
exports.fractionMod = (event,res,callback) => {           

	var num_queens = parseInt(event.queryStringParameters['num_queens']);
	var solutions = 0;
	for(var iter=parseInt(event.queryStringParameters['from']); iter<parseInt(event.queryStringParameters['to']); iter++){
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
	//returnsolutions;
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

var res = this.fractionMod({queryStringParameters: {from: from, to: to, num_queens: num_queens}           
  const done = (err, res) => callback(null, {           
    statusCode: err ? '400' : '200',           
    body: err ? err.message : JSON.stringify(res),           
    headers: {'Content-Type': 'application/json',           
    },           
  });           
  done(null,result);           
};