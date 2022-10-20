console.log('Loading config');
const config = require('./data/config.json')
console.log('Loading Discord.js');
const Discord = require('discord.js');
console.log('Loading database')
const db = require('./data/db');
const { Client, GatewayIntentBits } = require('discord.js');
console.log('Creating Client');
client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions
    ],
    presence: { activities: [{ name: `Waking up` }], status: 'online' }
});
client.buttons = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();

console.log('Loading custom prefixes');
client.prefixes = new Discord.Collection();
db.getPrefixes(function (res) {
    res.forEach((e) => {
        client.prefixes.set(e[0], e[1]);
    });
});

console.log('Loading custom colors');
client.colors = new Discord.Collection();
db.getColors(function (res) {
    res.forEach((e) => {
        client.colors.set(e[0], e[1]);
    });
});

console.log("Loading create-lobbys");
client.createLobbys = new Discord.Collection();
db.getLobbys(function (res) {
    res.forEach((e) => {
        client.createLobbys.set(e[0], e[1]);
    });
});
client.lobbys = [];

['event_handler', 'slash_command_handler', 'button_handler'].forEach(handler => {
    console.log(`Loading /handlers/${handler}`);
    require(`./handlers/${handler}`)(client, Discord);
})

console.log('Logging in');
client.login(config.client.token);