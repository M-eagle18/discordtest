const express = require("express");
const { Client, Intents } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <body>
      <center><h1>c'est bon le bot marchera 24h/24h</h1></center>
    </body>
  `);
});

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  setInterval(() => {
    const channel = client.channels.cache.get(process.env.channel);
    if (!channel || channel.type !== 'GUILD_TEXT') return;
    channel.send("Je dors");
  }, 2000); // Envoie un message "Je dors" toutes les 2 secondes
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log("Express server is listening on port " + PORT);
});

client.login(process.env.token);
