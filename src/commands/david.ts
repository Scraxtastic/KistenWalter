//Import causes Typescript erros, cuz the module is not listed
const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("david")
  .setDescription("jajaja command")
  .addStringOption((option) =>
    option.setName("jajaja").setDescription("jajaja").setRequired(false)
  );

const execute = async (interaction: any) => {
  const jajaja = interaction.options.getString("jajaja");
  if (jajaja)
    return interaction.reply(
      `Krass du hast Text angegeben, du kek :P ${jajaja}`
    );
  return interaction.reply(`Gib Text an du kek`);
};
export { data, execute };
