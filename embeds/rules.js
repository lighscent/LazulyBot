// send the rules embed
const djs = require('discord.js');
const log = require('../logger');
const channel = require('../config/channels.json');


module.exports = async (client) => {
    try {
        let channelRules = client.channels.cache.get(channel.text.rules);
        if (channelRules === undefined) {
            log.error(`Channel with ID ${channel.text.rules} not found`);
            return;
        } else {
            let messages = await channelRules.messages.fetch();
            // regarde si il y a déjà un message du bot, si oui, le supprime et envoie le nouveau, si non, envoie le nouveau
            let botMessages = messages.filter(m => m.author.id === client.user.id);
            if (botMessages.size > 0) {
                botMessages.first().delete();
            }
            let embed = new djs.EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Règlement du serveur')
                .setDescription(`# Bienvenue, voici la dernière étape avant d'accéder au serveur ^^ \n - **Règle 0:** Les ghosts pings envers le staff sera sanctionné instantanément
                \n\n - **Règle 1:** Toutes insultes sera sanctionnée, une preuve devra être présentée, ou des témoins devront être présent histoire de préserver l’humanité de ce serveur
                \n\n - **Règle 2:** Le respect doit être présent, c’est la base d’une communication, aucunes moqueries, aucun harcèlement ne devra être perçu en ces lieux, si cette règle n’est pas respectée le ou les responsable(s) se verront banni(s)
                \n\n - **Règle 3:** l’humour noir, ou à caractère NSFW (sexuel) n’est pas autorisé ici, si vous avez des blagues à caractère sexuel, ou des blagues noires, veuillez les garder pour vous, ou les partager dans un salon approprié
                \n\n - **Règle 4:** Le spam est interdit, si vous avez des choses à dire, veuillez les dire en une seule fois, et non en plusieurs messages, si vous ne respectez pas cette règle, vous serez sanctionné
                \n\n - **Règle 5:** Toute publicité est interdite, que ce soit pour un serveur, un site, ou un réseau social, si vous ne respectez pas cette règle, vous serez sanctionné
                \n\n\n Bien sur les T.O.S. de Discord s'appliquent ici aussi, donc si vous ne les respectez pas, vous serez sanctionné
                \n https://discord.com/tos`)
                .setFooter({ text: 'Made with ❤️ by azukiov' });

            const button = new djs.ButtonBuilder()
                .setStyle(djs.ButtonStyle.Primary)
                .setLabel('Accepter les règles')
                .setEmoji('✅')
                .setCustomId('accept_rules');

            const actionRow = new djs.ActionRowBuilder()
                .addComponents(button);

            channelRules.send({ embeds: [embed], components: [actionRow]})
            
        }
    } catch (err) {
        log.error(err);
    }
}