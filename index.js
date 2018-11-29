const express = require('express')
const port = process.env.PORT || 3000

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Cache-Control, Connection, Accept");
    next();
});
app.use(express.static('public'))

app.get('/liveWeight', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
  getLiveWeight(res, 10)
})

function getLiveWeight(res, count) {
  res.write("data: " + count + "\n\n")
  if (count)
    setTimeout(() => getLiveWeight(res, count-1), 1000)
  else
    res.end()
}

app.listen(port, () => console.log(`SSE app listening on port ${port}!`))
