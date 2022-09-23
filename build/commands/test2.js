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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
//Import causes Typescript erros, cuz the module is not listed
const { SlashCommandBuilder } = require("discord.js");
const data = new SlashCommandBuilder()
    .setName("test2")
    .setDescription("Test2 command")
    .addUserOption((option) => option.setName("user").setDescription("User to test2"));
exports.data = data;
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const user = interaction.options.getUser("user");
    if (user)
        return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
});
exports.execute = execute;
//# sourceMappingURL=test2.js.map