require('dotenv').config();
const express = require('express');
const app = express();
var path = require('path');

const port = process.env.PORT || 3000
const key = process.env.BOT_TOKEN;
let chat_id = process.env.CHAT_ID;

const Telegram = require('telegraf/telegram');
const telegram = new Telegram(key, {
  agent: null,
  webhookReply: true,});

const Telegraf = require('telegraf');
const bot = new Telegraf(key);

bot.use(ctx => {
  telegram.sendMessage(ctx.from.id,
  `Your Telegram id: ${chat_id}`
  );
});

bot.startPolling();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log('App listening on ' + port + '!'));

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
    chat_id,
    `Name: ${req.body.name}
     Email: ${req.body.email}
     Subject: ${req.body.subject}
     Message: ${req.body.message}`,
  ).catch(error => console.log(error))
});


