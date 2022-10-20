module.exports = {
	name: 'avatar',
	description: 'get users avatar',
	options: [
		{
			name: 'target',
			description: 'whomst do you wish to target?',
			required: false,
			type: 6
		}
	],
	execute(client, Discord, interaction) {

		let user;
		if (interaction.options.getUser('target')) {
			user = interaction.options.getUser('target');
		} else {
			user = interaction.member;
		}
		const webp = user.avatarURL({ dynamic: true, format: 'webp', size: 4096 });
		const png = user.avatarURL({ dynamic: true, format: 'png', size: 4096 });
		const jpg = user.avatarURL({ dynamic: true, format: 'jpg', size: 4096 });
		const jpeg = user.avatarURL({ dynamic: true, format: 'jpeg', size: 4096 });
		const embed = new Discord.EmbedBuilder()
			.setTitle(`${user.tag}'s avatar`)
			.setColor('#000000')
			.setImage(user.avatarURL({ dynamic: true, size: 4096 }))
			.setFooter({ text: new Date().toUTCString(), iconURL: client.user.avatarURL() })
			.addFields({
				name: 'Links:', value: `**[webp](${webp}) | [png](${png}) | [jpg](${jpg}) | [jpeg](${jpeg})**`
			});
		interaction.reply({embeds: [embed], ephemeral: true });

		/*const embed = new Discord.MessageEmbed()
			.setTitle(`***${user.tag}'s avatar***`)
			.setDescription()
		*/
	}
}