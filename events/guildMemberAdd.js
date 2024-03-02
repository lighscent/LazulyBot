const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');
const channel = require('../config/channels.json');
const messages = require('../config/messages.json');
const path = require('path');
const { createCanvas, loadImage } = require('canvas')

module.exports = {
    name: djs.Events.GuildMemberAdd,
    async execute(member, client) {
        try {


            // send the image to the channel
            let channelWelcome = member.guild.channels.cache.get(channel.text.welcome);
            if (channelWelcome === undefined) {
                log.error(`Channel with ID ${channel.text.welcome} not found`);
                return;
            } else {
                let baseImage = path.join(__dirname, '../img/uwu.png');
                let avatar = member.user.displayAvatarURL({ format: 'png' });

                //avec canvas on va créer une image avec le fond et l'avatar 
                const canvas = createCanvas(700, 250);
                const ctx = canvas.getContext('2d');

                const background = await loadImage(baseImage);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                ctx.beginPath();
                ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                const image = await loadImage(avatar);
                ctx.drawImage(image, 25, 25, 200, 200);

                const embed = djs.EmbedBuilder()
                    .setTitle(messages.welcome.title)
                    .setDescription(messages.welcome.description)
                    .setColor(messages.welcome.color)
                    .setImage('attachment://welcome.png')
                    .setFooter(messages.welcome.footer);

                channelWelcome.send({ embeds: [embed] });
            }



            let channelMemberCount = member.guild.channels.cache.get(channel.voice.memberCount);
            if (channelMemberCount === undefined) {
                log.error(`Channel with ID ${channel.voice.memberCount} not found`);
                return;
            } else {
                channelMemberCount.setName(`👥〃${member.guild.memberCount} membres`);
            }

        } catch (err) {
            log.error(err);
        }
    }
}