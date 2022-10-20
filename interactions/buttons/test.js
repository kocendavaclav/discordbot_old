const config = require('../../data/config.json');
module.exports ={
    name:'test',
    private:'false',
    async execute(cmd,id, interaction, client, Discord){
        const userId = id.split('-')[0];
        const channelId = id.split('-')[1];
        const channel = await client.channels.fetch(channelId);
        if(userId == interaction.member.id){
            interaction.reply('success');
        } else{
            interaction.reply('no');
        }
    }
}