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
exports.updateCommandsFor = exports.setUpdateCommandToken = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const commands = [];
const commandFiles = fs_1.default
    .readdirSync("./build/commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
let rest;
const setUpdateCommandToken = (token) => {
    rest = new discord_js_1.REST({ version: "10" }).setToken(token);
};
exports.setUpdateCommandToken = setUpdateCommandToken;
const updateCommandsFor = (guildId, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = yield rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateCommandsFor = updateCommandsFor;
//# sourceMappingURL=commandUpdater.js.map