require('dotenv').config();
const express = require('express');
const app = express();
var path = require('path');
const port = process.env.PORT || 3000
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.BOT_TOKEN, {
  agent: null,
  webhookReply: true,});
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(ctx => {
  telegram.sendMessage(ctx.from.id, 
  `Your Telegram id: ${ctx.from.id}`);
});
bot.startPolling();
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log('App listening on ' + port + '!'));

const fetch = require('node-fetch');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(express.json());
app.post('/', (req, res) => {
  telegram.sendMessage(
    process.env.COOMBA_ID,
    `Name: ${req.body.name}
     Email: ${req.body.email}
     Subject: ${req.body.subject}
     Message: ${req.body.message}`,
  );
});

// const url = 'http://localhost:3000';
// fetch(url, {
//   method: 'POST',
//   mode: 'cors',
//   body: JSON.stringify({...this.state.form}),
//   headers: {
//   'Content-Type': 'application/json',
//   },
// });