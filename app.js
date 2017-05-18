var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

var port = process.env.PORT || 3000;

var access_token = 'oli+Kn+x+YXoplW9F4oNL3y2ycYGVd6YOEdPpTPIYFBSmnvmdJJ+9HYBJVPfhNy2YAzXHZzrqw6K5WJwhNjIa/R5f2MwM2er/jmEgbD/fAJOG0xieQ2i9pnr2vtbAll+t0TTgPgKJOlyRd5Z4BpI7gdB04t89/1O/w1cDnyilFU=';

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  
   res.send('Hello world !!!')
  
  res.sendStatus(200)
})

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)

  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    sendText(sender, text)
  }
  res.sendStatus(200)
})

function sendText (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีครับ ผมชื่อบิ๊กน่ะครัช แหม่ !!!'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': access_token
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

app.use('/assets',express.static(__dirname + '/public'));




app.listen(port);