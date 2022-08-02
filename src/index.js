require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');

const TOKEN = process.env.TOKEN || "";

const PATTERN = '00 12 * * 0-5';

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./counter');
  }
  if(!localStorage.getItem("counter")){
    localStorage.setItem('counter', '0');
  }

const workers = [
    {name: "Bayanas", username: "McuWop"},
    {name: "Erma", username: "zetxc"},
    {name: "Chidori", username: "qzibet"},
    {name: "Nurhan", username: "alwayswannafly123"},
    {name: "Aybek", username: "aybekg2"},
    {name: "Vlad", username: "vlad1ee"},
    {name: "Sanzhar", username: "sanzhique13"},
    {name: "Ruslang", username: "mrcrendel"},
    {name: "Qap", username: "kapko19"},
    {name: "Aidar iOpent", username: "almbkvv"},
    {name: "Erla Frontello", username: "erik_2405"},
    {name: "Krokodil Gena", username: "portoprenso"},
    {name: "Iluha", username: "bronson_x"},
    {name: "Stas Senior", username: "nialav"},
]

let counter = +localStorage.getItem("counter");

const bot = new TelegramBot(TOKEN, {polling: true});

const job = schedule.scheduleJob(PATTERN, function(){
    console.log('Sended');
    bot.sendMessage(-401819133, `#duty @${workers[counter].username} ${workers[counter].name} сердечно поздравляю, ты дежурный =)`)

    counter++;
    localStorage.setItem('counter', counter);
});
