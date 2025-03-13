const fetch = require('node-fetch');
const gh = require('./general.js');

//APIs
const twitchValid = `https://id.twitch.tv/oauth2/validate`;

let liveStreams = [];
let chan;
let botconfig;
let twitchOauth;

module.exports = {
    getTwitchStreamer: async (channel, botdata) => {

        botconfig = botdata;
        twitchOauth = `https://id.twitch.tv/oauth2/token?client_id=${botconfig.twitchClient}&client_secret=${botconfig.twitchSecret}&grant_type=client_credentials`;

        chan = channel;
        await clearChannel();
        await checkTwitch()
        setInterval(async () => {await checkTwitch()}, 300000);
    }
}

async function getTwitchOauth() {
    let oauth = await gh.fetchPostAPIJSON(twitchOauth)
    let token = oauth.access_token;


    botconfig.twitchToken = token;

    gh.saveConfig(botconfig);

    console.log('Reset token');

    await checkTwitch();
}

function getTwitchAPI(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: {
                'Client-ID': botconfig.twitchClient,
                'Authorization': 'Bearer ' + botconfig.twitchToken, 
            }
            })
            .then(res => res.text())
            .then(JSON.parse)
            .then(resolve)
            .catch(reject)
    });
}

async function checkTwitch() {
    let status = await validateToken(twitchValid);

    switch (status.status) {
        case 401: 
            await getTwitchOauth();
            break;
        default:
            generateTwitchString();
            break;
    }
}

function validateToken(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + botconfig.twitchToken
            }
            })
            .then(res => res.text())
            .then(JSON.parse)
            .then(resolve)
            .catch(reject)
    });
}

async function generateTwitchString() {
    let twitchStream = `https://api.twitch.tv/helix/streams?`;
    let streams = botconfig.streams;

    streams.forEach((stream, idx, arr) => {
        if (idx != arr.length - 1) {
            twitchStream += `user_login=${stream}&`;
        } else {
            twitchStream += `user_login=${stream}`;
        }
    });

    parseTwitchResponse(await getTwitchAPI(twitchStream));
}

async function parseTwitchResponse(twitchAPI) {

    if (liveStreams.length > 0) {
        for (let i = 0; i < liveStreams.length; i++) {
            liveStreams[i][2] = 0;
        }
    }

    for (let i = 0; i < twitchAPI.data.length; i++) {
        let stream = twitchAPI.data[i];

        if (liveStreams.length == 0) {
            await sendTwitchEmbed(stream.user_name, stream.game_name);
        }

        for (let j = 0; j < liveStreams.length; j++) {
            if (liveStreams[j].includes(stream.user_name)){
                liveStreams[j][2] = 1;
                j = liveStreams.length;
            } else if ((j + 1) == liveStreams.length) {
                await sendTwitchEmbed(stream.user_name, stream.game_name);
            }
        }
    }
    await deleteStreamMessage();
}

async function deleteStreamMessage() {

    for (let i = 0; i < liveStreams.length; i++) {
        let stream = liveStreams[i];

        if (stream[2] == 0) {
            await chan.messages.fetch(stream[3]).then(msg => msg.delete()).catch('Missing message');
            liveStreams.splice(i,1);
        }
    }
}

async function clearChannel() {
    await chan.bulkDelete(100);
}

async function sendTwitchEmbed(streamer, game) {
    return new Promise(async (resolve, reject) => {
        let msg = await chan.send(`${streamer.replace('_','\\_')} is now live playing ${game}!\nCheck it out at https://twitch.tv/${streamer}`);
        liveStreams.push([streamer, game, 1, `${msg.id}`]);
        resolve(liveStreams);
    });
}