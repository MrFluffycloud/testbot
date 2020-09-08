const Discord = require('discord.js');
const client = new Discord.Client();
const {
	prefix,
	token
} = require('./config.json');
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}


client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'Cloud HQ',
            type: "WATCHING",
            url: "https://www.twitch.tv/MrFluffycloud"
        }
    });
});

client.on('message', async message => {

    if (message.content === 'Fluff Bot') {
        const user = message.mentions.users.first() || message.author;
        message.delete(1000);
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription('```!```')
        .setTitle('My prefix is')
        .setFooter(`Requested by ${user.username}`, user.avatarURL)
        .setTimestamp()
            message.channel.send(embed);
    
        }

    // Command-specific code here!
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();

		// ---> Reading normal commands
		if (!client.commands.has(command)) {
			return message.reply('That is not a command!');
		}
		try {

			// ---> Running the command
            client.commands.get(command).execute(message, args, client);
            
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
        }
    
});

client.login(config.token);