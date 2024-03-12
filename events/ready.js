const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');
const channel = require('../config/channels.json');

module.exports = {
    name: djs.Events.ClientReady,
    once: true,
    execute(client) {
        try {

            const status = [
                () => `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membres`,
                () => `.gg/azukiov`,
                () => `twitch.tv/azukiov`,
                () => `Youtube Azukiov`
            ]
            let i = 0;
            setInterval(() => {
                client.user.setActivity(status[i](), { type: djs.ActivityType.Watching });
                i = ++i % status.length;
            }, 5e3);

            let channelMemberCount = client.channels.cache.get(channel.voice.memberCount);
            if (channelMemberCount === undefined) {
                log.error(`Channel with ID ${channel.voice.memberCount} not found`);
                return;
            } else {
                channelMemberCount.setName(`👥〃${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membres`);
            }
            
            let channelBoostCount = client.channels.cache.get(channel.voice.boostCount);
            if (channelBoostCount === undefined) {
                log.error(`Channel with ID ${channel.voice.boostCount} not found`);
                return;
            } else {
                channelBoostCount.setName(`🚀〃${client.guilds.cache.reduce((a, g) => a + g.premiumSubscriptionCount, 0)} boosts`);
            }

            
            require('../embeds/rules.js')(client);

        } catch (err) {
            log.error(err);
        }
    }
}