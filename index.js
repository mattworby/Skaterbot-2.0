const { Client, Intents } = require('discord.js');

const hs = require('./helpers/hearthstone.js');
const msg = require('./helpers/textmsg.js');
const pic = require('./helpers/picture.js');
const tw = require('./helpers/twitch.js');
const gh = require('./helpers/general.js');
const fs = require('fs');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let rawdata = fs.readFileSync('./configuration/botconfig.json');
let botdata = JSON.parse(rawdata);
let running = false;

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
});

bot.on("messageCreate", async message => {
    let prefix = botdata.prefix;

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if(message.content.charAt(0) !== prefix) return;

    let cmd = message.content.split(/ (.+)/)[0];
    let args = message.content.split(/ (.+)/)[1];

    cmd = cmd.replace(prefix, "").toLowerCase();
    if (!args === null) args = args.toLowerCase();

    switch (cmd) {
        case 'ayaya':
            message.channel.send(msg.getAyaya());
            break;
        case 'cat':
            message.channel.send({ embeds: [await pic.getCat()] });
            break;
        case 'dog':
            message.channel.send({ embeds: [await pic.getDog()] });
            break;
        case 'deck': 
            let deckMsg = await hs.searchDeck(args);
            if (typeof deckMsg == "string") message.channel.send(deckMsg);
            else message.channel.send({ embeds: [deckMsg] });
            break;
        case 'funny':
            message.channel.send(msg.getPepelaugh());
            break;
        case 'help':
            message.channel.send({ embeds: [msg.getHelp()] });
            break;
        case 'hs': 
            let hsMsg = await hs.searchCard(args);
            if (typeof hsMsg == "string") message.channel.send(hsMsg);
            else message.channel.send({ embeds: [hsMsg] });
            break;
        case 'waifu':
            message.channel.send(msg.getWaifu(message.author.username.replace('@','')));
            break;
	case 'chef':
            if (message.author.id === '265324731467563018') {
                message.channel.send('Krillin fat <:chef:797878948817666118>');
            } else {
                message.channel.send('<:tf:958530882065539134>');
            }
            break;
        case '8ball':
            if (message.author.id === '265324731467563018') {
                message.channel.send(msg.get8Ball(0));
            } else {
                message.channel.send(msg.get8Ball(1));
             }
            break;
        default:
            break;
    }

    //Admin commands
    if ((message.guild.id == 588758277605818369 && message.member.roles.cache.some(role => role.name === 'Moderator')) || message.author.id == 265324731467563018) {
        switch(cmd) {
            case 'adminhelp':
                message.channel.send({ embeds: [msg.getAdmin()] });
                break;
            case 'addstream':
                botdata.streams.push(args);
                message.channel.send(`Added ${args} to the streamer list!`);
                break;
            case 'removestream':
                let index = botdata.streams.indexOf(args);
                if (index > -1) { 
                    botdata.streams.splice(index, 1);
                    message.channel.send(`Removed ${args} to the streamer list!`);
                } else {
                    message.channel.send(`Could not find ${args}!`);
                }
                break;
            case 'streamlist':
                let streamers = '';

                if (botdata.streams.length > 0) {
                    botdata.streams.forEach(stream => streamers += `${stream}\n`);
                    message.channel.send(streamers);
                } else {
                    message.channel.send('Streamer list is empty!');
                }
               break;
            case 'runtwitch':
                if (!running) {
                    running = true;
                    await tw.getTwitchStreamer(bot.channels.cache.get('588951491595993088'), botdata);
                } else {
                    message.channel.send(`Twitch command is already running!`);
                }
                break;
            default:
                break;
        }
        gh.saveConfig(botdata);
    }
});

bot.login(botdata.token);