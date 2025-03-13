const { MessageEmbed } = require('discord.js');

const responseBall = {
    "good": [
        'It is certain',
        'Without a doubt',
        'You may rely on it',
        'Yes definitely',
        'It is decidedly so',
        'As I see it, yes',
        'Most likely',
        'Yes',
        'Outlook good',
        'Signs point to yes'
    ],
    "neutral": [
        'Reply hazy try again',
        'Better not tell you now',
        'Ask again later',
        'Cannot predict now',
        'Concentrate and ask again'
    ],
    "bad": [
        'Don\'t count on it',
        'Outlook not so good',
        'My sources say no',
        'Very doubtful',
        'My reply is no'
    ]
}

module.exports = {
    getAyaya: () => {
        return '⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣬⡛⣿⣿⣿⣯⢻\n' +
            '⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢻⣿⣿⢟⣻⣿⣿⣿⣿⣿⣿⣮⡻⣿⣿⣧\n' +
            '⣿⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣆⠻⡫⣢⠿⣿⣿⣿⣿⣿⣿⣿⣷⣜⢻⣿\n' +
            '⣿⣿⡏⣿⣿⣨⣝⠿⣿⣿⣿⣿⣿⢕⠸⣛⣩⣥⣄⣩⢝⣛⡿⠿⣿⣿⣆⢝\n' +
            '⣿⣿⢡⣸⣿⣏⣿⣿⣶⣯⣙⠫⢺⣿⣷⡈⣿⣿⣿⣿⡿⠿⢿⣟⣒⣋⣙⠊\n' +
            '⣿⡏⡿⣛⣍⢿⣮⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿\n' +
            '⣿⢱⣾⣿⣿⣿⣝⡮⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⣋⣻⣿⣿⣿⣿\n' +
            '⢿⢸⣿⣿⣿⣿⣿⣿⣷⣽⣿⣿⣿⣿⣿⣿⣿⡕⣡⣴⣶⣿⣿⣿⡟⣿⣿⣿\n' +
            '⣦⡸⣿⣿⣿⣿⣿⣿⡛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⣿⣿⣿\n' +
            '⢛⠷⡹⣿⠋⣉⣠⣤⣶⣶⣿⣿⣿⣿⣿⣿⡿⠿⢿⣿⣿⣿⣿⣿⣷⢹⣿⣿\n' +
            '⣷⡝⣿⡞⣿⣿⣿⣿⣿⣿⣿⣿⡟⠋⠁⣠⣤⣤⣦⣽⣿⣿⣿⡿⠋⠘⣿⣿\n' +
            '⣿⣿⡹⣿⡼⣿⣿⣿⣿⣿⣿⣿⣧⡰⣿⣿⣿⣿⣿⣹⡿⠟⠉⡀⠄⠄⢿⣿\n' +
            '⣿⣿⣿⣽⣿⣼⣛⠿⠿⣿⣿⣿⣿⣿⣯⣿⠿⢟⣻⡽⢚⣤⡞⠄⠄⠄⢸⣿\n';
    },
    getPepelaugh: () => {
        return '⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠻⠿⣿⣿⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿\n' +
        '⣿⣿⣿⣿⣿⣿⠟⠉⠄⠄⠄⠄⠄⠄⠄⠉⢟⠉⠄⠄⠄⠄⠄⠈⢻⣿⣿⣿⣿⣿\n' +
        '⣿⣿⣿⣿⡿⠃⠄⠄⠤⠐⠉⠉⠉⠉⠉⠒⠬⡣⠤⠤⠄⠄⠄⠤⠤⠿⣿⣿⣿⣿\n' +
        '⣿⣿⣿⣿⠁⠄⠄⠄⠄⠄⠄⠠⢀⡒⠤⠭⠅⠚⣓⡆⡆⣔⡙⠓⠚⠛⠄⣹⠿⣿\n' +
        '⣿⠟⠁⡌⠄⠄⠄⢀⠤⠬⠐⣈⠠⡤⠤⠤⣤⠤⢄⡉⢁⣀⣠⣤⣤⣀⣐⡖⢦⣽\n' +
        '⠏⠄⠄⠄⠄⠄⠄⠄⠐⠄⡿⠛⠯⠍⠭⣉⣉⠉⠍⢀⢀⡀⠉⠉⠉⠒⠒⠂⠄⣻\n' +
        '⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠩⠵⠒⠒⠲⢒⡢⡉⠁⢐⡀⠬⠍⠁⢉⣉⣴⣿⣿\n' +
        '⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⢉⣒⡉⠁⠁⠄⠄⠉⠂⠙⣉⣁⣀⣙⡿⣿⣿\n' +
        '⠄⠄⠄⠄⠄⠄⠄⠄⢠⠄⡖⢉⠥⢤⠐⢲⠒⢲⠒⢲⠒⠲⡒⠒⡖⢲⠂⠄⢀⣿\n' +
        '⠄⠄⠄⠄⠄⠄⠄⠄⠈⢆⡑⢄⠳⢾⠒⢺⠒⢺⠒⠚⡖⠄⡏⠉⣞⠞⠁⣠⣾⣿\n' +
        '⠄⠄⠄⠄⠄⠄⢆⠄⠄⠄⠈⠢⠉⠢⠍⣘⣒⣚⣒⣚⣒⣒⣉⠡⠤⣔⣾⣿⣿⣿\n' +
        '⠷⣤⠄⣀⠄⠄⠄⠈⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣤⣾⣿⣿⣿⣿⣿\n' +
        '⠄⠄⠉⠐⠢⠭⠄⢀⣒⣒⡒⠄⠄⠄⠄⠄⠄⣀⡠⠶⢶⣿⣿⣿⣿⣿⣿⣿⣿⣿\n' +
        '⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠁⠈⠄⠄⠄⠄⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⣿'
    },
    getWaifu: (user) => {
        let rndNum = Math.floor(Math.random() * 101);

        switch (true) {
            case (rndNum < 25): 
                return 'Baka! ' + '😠 \nWaifu Status: ' + rndNum + '/100';
                break;
            case (rndNum < 50): 
                return user + ' is more overrated than SAO! ' + '😤 \nWaifu Status: ' + rndNum + '/100';
                break;
            case (rndNum < 75): 
                return 'Senpai is looking pretty good today! ' + '😏 \nWaifu Status: ' + rndNum + '/100';
                break;
            case (rndNum < 100): 
                return user + ' would totes be my next body pillow!! ' + '😍 \nWaifu Status: ' + rndNum + '/100';
                break;
            case (rndNum == 100):
                return 'ZOMG ' + user + '-chan is so kawaii!!!11!!1 OwO \nWaifu Status: ' + rndNum + '/100';
                break;
            default:
                console.log('Well shit..');
        }
        return 'Oops..';
    },
    getHelp: () => {
        return formatHelp();
    },
    getAdmin: () => {
        return adminHelp();
    },
    get8Ball: (fake) => {
        let rng, outcome;
        rng = Math.floor(Math.random() * 3);

        switch (rng) {
            case 0:
                outcome = responseBall.good[Math.floor(Math.random() * responseBall.good.length)]
                break;
            case 1:
                outcome = responseBall.neutral[Math.floor(Math.random() * responseBall.neutral.length)]
                break;
            case 2:
                outcome = responseBall.bad[Math.floor(Math.random() * responseBall.bad.length)]
                break;
            default:
                break;
        }
    
        return outcome;
    }
}

function formatHelp() {
    return new MessageEmbed()
        .setColor(9539215)
        .setTitle('')
        .setURL('')
        .setThumbnail('')
        .addFields(
            { name: '😎 Fun Commands', 
                value: 
                    '**ayaya -** AYAYA?? AYAYA!!\n' +
                    '**cat -** Return a pretty picture of a kitty!\n' +
                    '**dog -** Retrieve a wonderful picture of a doggy!\n' +
                    '**funny -** PepeLaugh\n' +
                    '**waifu -** See where you stack in waifu ranking!\n\n' },
            { name: '🤑 Hearthstone Commands', 
                value: 
                    '**hs [] -** Replace braces with an HS card to list its info!\n' +
                    '**deck [] -** Replace the braces with your HS deckstring to output the deck in Discord!\n\n' }
        )
        .setFooter('Please preface all commands with \'!\'');
}

function adminHelp() {
    return new MessageEmbed()
        .setColor(9539215)
        .setTitle('')
        .setURL('')
        .setThumbnail('')
        .addFields(
            { name: '🤓 Admin Commands', 
                value: 
                    '**addstream -** Add stream to streamer list\n' +
                    '**clearstream -** Clear streamer list\n' +
                    '**removestream -** Remove stream to streamer list\n' +
                    '**streamlist -** Get streamer list\n' +
                    '**runtwitch -** run streams command\n'}
        )
        .setFooter('Please preface all commands with \'!\'');
}