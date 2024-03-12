const djs = require('discord.js');
const log = require('../logger');
const roles = require('../config/roles.json');

module.exports = {
    name: djs.Events.InteractionCreate,
    async execute(interaction) {
        let client = interaction.client;

        try {
            if (interaction.isButton()) {
                if (interaction.customId === 'accept_rules') {
                    let member = interaction.member;
                    let role = member.guild.roles.cache.get(roles.member);
                    if (role === undefined) {
                        log.error(`Role with ID ${roles.member} not found`);
                        return;
                    } else {
                        member.roles.add(role);
                        interaction.reply({ content: `Bien joué à toi ^^, viens parler avec nous dans <#1142437001346420796>`, ephemeral: true });
                    }
                }
            }



            if (!interaction.isChatInputCommand()) return;
            let command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                log.error(`Command ${interaction.commandName} not found.`);
                return interaction.reply({ content: `Command not found`, ephemeral: true });
            }

            await command.execute(client, interaction);
            log.cmd(`${interaction.user.id} used command ${interaction.commandName} in ${interaction.guild.id}`)
        } catch (error) {
            console.log(error);
            log.error(`Command ${interaction.commandName} failed to execute.`);
            // alert.cmd({ error: error, command: interaction.commandName, guild: interaction.guild.id, user: interaction.user.id })
            interaction.reply({ content: `An error occurred while using the command\nPlease send a message to [support](https://discord.gg/azukiov)`, ephemeral: true });
        }
    }
}