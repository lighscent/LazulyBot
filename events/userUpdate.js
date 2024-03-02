const djs = require('discord.js');
const log = require('../logger');

module.exports = {
    name: djs.Events.UserUpdate,
    async execute(oldUser, newUser) {
        try {
            // check in his custom status if he has .gg/azukiov or gg/azukiov or /azukiov or discord.gg/azukiov
            if (newUser.presence.activities.some(activity => activity.name.toLowerCase().includes('.gg/azukiov') || activity.name.toLowerCase().includes('gg/azukiov') || activity.name.toLowerCase().includes('/azukiov') || activity.name.toLowerCase().includes('discord.gg/azukiov'))) {
                let user = newUser;
                let guild = newUser.client.guilds.cache.get('863498186715037746');
                let member = guild.members.cache.get(user.id);
                let role = guild.roles.cache.get('1155348616664322203');
                if (member.roles.cache.has(role.id)) return;
                member.roles.add(role);
            }
        } catch (err) {
            log.error(err);
        }
    }
}