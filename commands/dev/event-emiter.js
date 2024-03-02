const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event-emiter')
        .setDescription('Simulates an event')
        .addStringOption(option => option.setName('event').setDescription('The event to simulate').setRequired(true).addChoices(
            { name: 'guildMemberAdd', value: 'guildMemberAdd' },
            { name: 'ready', value: 'ready' },
        )),

    async execute(client, interaction) {
        const event = interaction.options.getString('event');

        if (event === 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
        } else if (event === 'ready') {
            client.emit('ready', client);
        }

        await interaction.reply({ content: `Simulated event ${event}`, ephemeral: true });
    }
}