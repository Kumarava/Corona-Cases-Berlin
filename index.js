require("dotenv").config();
const { default: Axios } = require("axios");
const { Telegraf } = require("telegraf");

let url =
  "https://interaktiv.tagesspiegel.de/coronadaten/api/bundeslaender/11/all.json?v=kixe8vrx";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("stats", async (ctx) => {
  try {
    const response = await Axios.get(url);
    const results = response.data.pop();
    const cleanData = {
      date: results.date,
      confirmed: results.confirmed,
      deaths: results.deaths,
      recovered: results.recovered,
      active: results.active,
      new: results.new,
    };
    const date = `Today is a ${cleanData.date}.`;
    const confirmed = `Till now we have ${cleanData.confirmed} confirmed cases.`;
    const deaths = `Till now we have ${cleanData.deaths} death cases.`;
    const recovered = `Actual amount of recovered people ${cleanData.recovered}.`;
    const active = `Active cases ${cleanData.active}.`;
    const newCases = `New cases ${cleanData.new}.`;
    ctx.reply(date);
    ctx.reply(confirmed);
    ctx.reply(deaths);
    ctx.reply(recovered);
    ctx.reply(active);
    ctx.reply(newCases);
  } catch (error) {
    console.error(error);
  }
});
bot.launch();
