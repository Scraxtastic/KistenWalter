const { Client, APIMessage, GatewayIntentBits } = require("discord.js");
const { readdirSync } = require("fs");
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { setUpdateCommandToken, updateCommandsFor } from "./commandUpdater";
const commandPath = path.join(__dirname, "commands");
const token = process.env.BotAuthToken;
const id = process.env.BotID;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
setUpdateCommandToken(token);

const commands = [];
console.log(commandPath);
const commandFiles = readdirSync(commandPath).filter((file) =>
  file.endsWith(".js")
);

console.log("commandPathFiles", readdirSync(commandPath));
console.log("commandFiles", commandFiles);

client.on("ready", async () => {
  const guildIdsToUpdate = client.guilds.cache.map((guild) => guild.id);
  for (const guildId of guildIdsToUpdate) {
    await updateCommandsFor(guildId, id);
  }
  for (const fileName of commandFiles) {
    const loadedCommand = require(`./commands/${fileName}`);
    commands.push(loadedCommand);
    // await client.api.applications(client.user.id).commands.post({
    //   data: loadedCommand.data,
    // });
  }
  console.info(`Logged in as ${client.user.username}`);
});

client.on("interactionCreate", (interaction) => {
  const foundCommand = commands.find((cmd) => {
    console.log("cmd", cmd.data.name.toLowerCase());
    console.log("interaction", interaction);
    return (
      cmd.data.name.toLowerCase() === interaction.commandName.toLowerCase()
    );
  });
  if (foundCommand) {
    foundCommand.execute(interaction);
  }
});

client.login(token);
