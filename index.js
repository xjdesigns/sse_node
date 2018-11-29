const express = require('express')
const port = process.env.PORT || 3000
const howLong = process.env.HOWLONG || 1000

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Cache-Control, Connection, Accept");
    next();
});
app.use(express.static('public'))

app.get('/v1/liveweight', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
  getLiveWeight(res, howLong)
})

function getLiveWeight(res, howLong) {
  const randomWeight = makeRandomWeight()
  res.write(`data: { \"weight\": \"${randomWeight}\"} \n\n`)
  if (howLong)
    setTimeout(() => getLiveWeight(res, howLong-1), 1000)
  else
    res.end()
}

function makeRandomWeight ()  {
  const random = Math.random()
  return random.toFixed(2)
}

app.listen(port, () => console.log(`SSE app listening on port ${port}!`))
