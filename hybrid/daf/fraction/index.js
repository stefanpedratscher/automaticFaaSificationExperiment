const external = require("./external.js")
const _ = require("lodash")

module.exports = (event) => {
  const from        = parseInt(event.from)
  const to          = parseInt(event.to)
  const num_queens  = parseInt(event.num_queens)

  var solutions = 0
  for (var iter=from; iter<to; iter++) {
    var code = iter
    var queen_rows = []
    for (var i of _.range(0, num_queens)) {
      queen_rows[i] = code % num_queens
      code = Math.floor(code / num_queens)
    }
    // call frunction another file
    if (external.acceptable(num_queens, queen_rows)) {
      console.log(queen_rows)
      solutions += 1
    }
  }
  return { solutions: solutions }
}
