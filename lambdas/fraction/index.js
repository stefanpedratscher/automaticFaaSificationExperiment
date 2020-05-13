const external = require("./external.js")
const _ = require("lodash")

exports.handler = async (event, context) => {
  let ev = event.ev
  let res = event.res

  var from = parseInt(ev.params.from)
  var to = parseInt(ev.params.to)
  var num_queens = parseInt(ev.params.num_queens)
  var solutions = 0
  for (var iter of _.range(from, to)) {
    var code = iter
    var queen_rows = []
    for (var i of _.range(0, num_queens)) {
      queen_rows[i] = code % num_queens
      code = Math.floor(code / num_queens)
    }
    // call frunction another file
    if (external.acceptable(num_queens, queen_rows)) {
      // TODO call npm package
      console.log(queen_rows)
      solutions += 1
    }
  }
  context.succeed(solutions)
}
