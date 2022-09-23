"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Client, APIMessage, GatewayIntentBits } = require("discord.js");
const { readdirSync } = require("fs");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commandUpdater_1 = require("./commandUpdater");
const commandPath = path_1.default.join(__dirname, "commands");
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
(0, commandUpdater_1.setUpdateCommandToken)(token);
const commands = [];
console.log(commandPath);
const commandFiles = readdirSync(commandPath).filter((file) => file.endsWith(".js"));
console.log("commandPathFiles", readdirSync(commandPath));
console.log("commandFiles", commandFiles);
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    const guildIdsToUpdate = client.guilds.cache.map((guild) => guild.id);
    for (const guildId of guildIdsToUpdate) {
        yield (0, commandUpdater_1.updateCommandsFor)(guildId, id);
    }
    for (const fileName of commandFiles) {
        const loadedCommand = require(`./commands/${fileName}`);
        commands.push(loadedCommand);
        // await client.api.applications(client.user.id).commands.post({
        //   data: loadedCommand.data,
        // });
    }
    console.info(`Logged in as ${client.user.username}`);
}));
client.on("interactionCreate", (interaction) => {
    const foundCommand = commands.find((cmd) => {
        console.log("cmd", cmd.data.name.toLowerCase());
        console.log("interaction", interaction);
        return (cmd.data.name.toLowerCase() === interaction.commandName.toLowerCase());
    });
    if (foundCommand) {
        foundCommand.execute(interaction);
    }
});
client.login(token);
//# sourceMappingURL=client.js.map