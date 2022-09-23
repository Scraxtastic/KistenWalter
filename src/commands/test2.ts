//Import causes Typescript erros, cuz the module is not listed
const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("test2")
  .setDescription("Test2 command")
  .addUserOption((option: any) =>
    option.setName("user").setDescription("User to test2")
  );

const execute = async (interaction: any) => {
  const user = interaction.options.getUser("user");
  if (user)
    return interaction.reply(
      `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`
    );
  return interaction.reply(
    `Your avatar: ${interaction.user.displayAvatarURL()}`
  );
};
export { data, execute };
