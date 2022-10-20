const db = require('../../data/db');
module.exports =(Discord,client) => {
    client.user.setPresence({ activities: [{ name: `Mp#4006's Discord Bot .xyz`}], status: 'online' });
    setInterval(()=>{
        client.user.setPresence({ activities: [{ name: `Mp#4006's Discord Bot .xyz`}], status: 'online' });
    },600000);
    console.log('Bot is ready!');
    setInterval(()=>{
        console.log(`Bot is currently in ${client.guilds.cache.size} guilds.`);
    },300000);
    console.log(`Bot is currently in ${client.guilds.cache.size} guilds.`);
};