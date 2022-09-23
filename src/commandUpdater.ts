import { REST, Routes } from "discord.js";
import fs from "fs";
const commands = [];
const commandFiles = fs
  .readdirSync("./build/commands")
  .filter((file: any) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
let rest;
export const setUpdateCommandToken = (token: string) => {
  rest = new REST({ version: "10" }).setToken(token);
};

export const updateCommandsFor = async (guildId: string, clientId) => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data: any = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
};
