require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');
const fetch = require("node-fetch")


const TOKEN = process.env.TOKEN || "";
const JOKE_API = "https://v2.jokeapi.dev/joke/Programming?format=txt"

// Pattern used before recurrence rule
// const PATTERN = '00 12 * * 0-5';
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 5);
rule.hour = 12;
rule.minute = 0;
rule.tz = "Asia/Bishkek"

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
    {name: "Aybek", username: "qrtzet"},
    {name: "Vlad", username: "vlad1ee"},
    {name: "Sanzhar", username: "sanzhique13"},
    {name: "Ruslang", username: "mrcrendel"},
    {name: "Qap", username: "kapko19"},
    {name: "Ras", username: "king_rmt"},
    {name: "Erjanius", username: "corgianius"},
    {name: "Erbolidze", username: "nurmanbetov15"},
    {name: "Aidar iOpent", username: "almbkvv"},
    {name: "Erla Frontello", username: "erik_2405"},
    {name: "Krokodil Gena", username: "portoprenso"},
    {name: "Iluha", username: "bronson_x"},
    {name: "Stas Senior", username: "nialav"},
]

const getJoke = async  () => {
    try{
      const response = await fetch(JOKE_API)
      return await response.text()
    }catch (e) {
      return ""
    }
}

const getCurrentIndex = () => {
 const currentIndex = +localStorage.getItem("counter")

 if(currentIndex > workers.length - 1) {
  return 0
 }
 return currentIndex;
}


const bot = new TelegramBot(TOKEN, {polling: true});

// Matches /love
bot.on("message", function (msg) {

  bot.sendMessage(msg.chat.id, "Hehe boy");
});

const job = schedule.scheduleJob(rule, function(){
  const joke = getJoke();
  let counter = getCurrentIndex();

  joke.then(text=> {
    bot.sendMessage(-401819133, `#duty @${workers[counter].username} ${workers[counter].name} сердечно поздравляю, ты дежурный =)`)
    bot.sendMessage(-401819133, text )
  })

    counter++;
    localStorage.setItem('counter', String(counter));
});
