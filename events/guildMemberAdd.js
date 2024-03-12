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
                let baseImage = path.join(__dirname, '../img/welcome.png');
                let avatar = member.user.displayAvatarURL({ format: 'png' });
                avatar = avatar.replace('.webp', '.png');

                const canvas = createCanvas(700, 250);
                const ctx = canvas.getContext('2d');

                const background = await loadImage(baseImage);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                ctx.beginPath();
                ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
                ctx.closePath();
                
                ctx.save()
                ctx.clip();

                const image = await loadImage(avatar);
                ctx.drawImage(image, 25, 25, 200, 200);

                ctx.restore();

                ctx.font = '35px Arial Rounded MT Bold';
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 2;
                ctx.strokeText(`Bienvenue ${member.user.username}`, 250, 105);
                ctx.fillText(`Bienvenue ${member.user.username}`, 250, 105);

                ctx.font = '30px Arial Rounded MT Bold';
                ctx.strokeText(`Tu es le membre #${member.guild.memberCount} <3`, 250, 175);
                ctx.fillText(`Tu es le membre #${member.guild.memberCount} <3`, 250, 175);

                const buffer = canvas.toBuffer('image/png');


                channelWelcome.send({ content: `Welcome to the server, ${member}`, files: [{ attachment: buffer, name: 'welcome.png' }] });
            }



            let channelMemberCount = member.guild.channels.cache.get(channel.voice.memberCount);
            if (channelMemberCount === undefined) {
                log.error(`Channel with ID ${channel.voice.memberCount} not found`);
                return;
            } else {
                channelMemberCount.setName(`👥〃${member.guild.memberCount} membres`);
            }

            let channelBoostCount = member.guild.channels.cache.get(channel.voice.boostCount);
            if (channelBoostCount === undefined) {
                log.error(`Channel with ID ${channel.voice.boostCount} not found`);
                return;
            } else {
                channelBoostCount.setName(`🚀〃${member.guild.premiumSubscriptionCount} boosts`);
            }

        } catch (err) {
            log.error(err);
        }
    }
}