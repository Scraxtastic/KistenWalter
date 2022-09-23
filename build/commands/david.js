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
    .setName("david")
    .setDescription("jajaja command")
    .addStringOption((option) => option.setName("jajaja").setDescription("jajaja").setRequired(false));
exports.data = data;
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const jajaja = interaction.options.getString("jajaja");
    if (jajaja)
        return interaction.reply(`Krass du hast Text angegeben, du kek :P ${jajaja}`);
    return interaction.reply(`Gib Text an du kek`);
});
exports.execute = execute;
//# sourceMappingURL=david.js.map