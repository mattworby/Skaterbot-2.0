const { MessageEmbed } = require('discord.js');
const gh = require('./general.js');

//API consts
const dogAPI = 'https://dog.ceo/api/breeds/image/random';
const catAPI = 'https://api.thecatapi.com/v1/images/search';

module.exports = {
    getDog: async () => {
        let dogImg = await gh.fetchAPIJSON(dogAPI);

        return formatEmbed('Dogs!', dogImg.message);
    },
    getCat: async () => {
        let catImg = await gh.fetchAPIJSON(catAPI);

        return formatEmbed('Cats!', catImg[0].url);
    }
}

function formatEmbed(title, img) {

    return new MessageEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTitle(title)
        .setURL('')
        .setImage(img)
}