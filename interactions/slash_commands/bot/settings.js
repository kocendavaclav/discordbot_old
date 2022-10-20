const db = require('../../../data/db');
const functions = require('../../../data/randomFunctions');
const BCP47 = require('../../../data/BCP47.json');
module.exports = {
    name: 'settings',
    description: 'Customize the bot for this guild!',
    options: [
        {
            name: 'color',
            description: 'Change the color the bot will use (in embeds), fot this guild',
            type: 1,
            options: [
                {
                    name: 'color',
                    description: 'The hex color',
                    required: 1,
                    type: 3
                }
            ]
        },
        {
            name: 'time',
            description: 'Use `/settings time list` to get the comple list of available locales to use.',
            type: 1,
            options: [
                {
                    name: 'locale',
                    description: 'The locale to use',
                    required: 1,
                    type: 3
                }
            ]
        }
    ],
    execute(client, Discord, interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'color':
                const reg = /^#[0-9A-F]{6}$/i;
                if (!reg.test(interaction.options.getString('color'))) return interaction.reply('That is not a hex color! (Hex colors start with # followed by 6 numbers 0-9 or letters A-F. Example: `#FC039D` - Hot Pink');
                db.insert('settings_color', [interaction.guildId, interaction.options.getString('color')]);
                client.colors.set(interaction.guildId, interaction.options.getString('color'));
                const embed = new Discord.EmbedBuilder()
                    .setTitle('Color changed to: ' + interaction.options.getString('color'))
                    .setColor(functions.getMeAColor(client, interaction.guildId));
                interaction.reply({ embeds: [embed] });
                break;
            case 'time':
                if(getBCP().tags.includes(interaction.options.getString('locale').toLowerCase())){
                    client.locales.set(interaction.guildId,interaction.options.getString('locale'));
                    db.insert('settings_time',[interaction.guildId,interaction.options.getString('locale')]);
                    const embed = new Discord.EmbedBuilder()
                        .setTitle('Time updated')
                        .setColor(functions.getMeAColor())
                        .addField('This should be your current time',new Date(Date.UTC()))

                }else{
                    interaction.reply('Use `/settings time list` to get a full list of available locales.');
                }
                break;
            default:
                interaction.reply('What settings? (select a subcommand)');
                break;
        }
    }

}
function getBCP() {
    let res = {
        tags:[],
        descriptions:[]
    };
    BCP47.forEach((e) => {
        res.tags.push(e.tag.toLowerCase());
        res.descriptions.push(`${e.language} - ${e.region}`);
    });
    return res;
}