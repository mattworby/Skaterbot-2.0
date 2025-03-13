const { MessageEmbed } = require('discord.js');
const hsDeck = require("deckstrings");
const gh = require('./general.js');

//API consts
const hearsthoneAPI = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json';
const hearsthoneImg = 'https://art.hearthstonejson.com/v1/render/latest/enUS/512x/';

module.exports = {
    searchCard: async (card) => {

        if (card === undefined) return "Please enter a card..";

        let HSAPI = await gh.fetchAPIJSON(hearsthoneAPI);
        let prioFlag = 0;
        let cardIndex = 0;

        for (let i = 0; i < HSAPI.length; i++) {
            if (HSAPI[i].name.toLowerCase().includes(card.trim().toLowerCase()) && prioFlag < 2) {
                prioFlag = 1;
                cardIndex = i;
            } 
            
            if (HSAPI[i].name.toLowerCase() == card.trim().toLowerCase()) {
                prioFlag = 2;
                cardIndex = i;
            }
        }
        
        if (prioFlag == 0) return "Could not find your card. Please try again.";
        
        return formatEmbed(HSAPI[cardIndex]);
    },
    searchDeck: (deck) => {
        return decodeDeck(deck);
    }
}

function formatEmbed(msg) {
    let footer = 'None';
    if (msg.type !== 'HERO') footer = msg.flavor;

    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(msg.name)
        .setURL('')
        .setThumbnail(hearsthoneImg + msg.id + '.png')
        .addFields(
            { name: 'Type', value: gh.capitalizeCorrectionHelper(msg.type), inline:true },
            { name: '\u200b', value: '\u200b', "inline": true},
            { name: 'Class', value: gh.capitalizeCorrectionHelper(msg.cardClass), inline:true},
            { name: 'Rarity', value: gh.capitalizeCorrectionHelper(msg.rarity), inline: true },
            { name: '\u200b', value: '\u200b', "inline": true},
            { name: 'Set', value: msg.set, inline: true },
            { name: 'Card Text', value: fixCardText(msg.text) }
        )
        .setFooter(footer);
}

function fixCardText(text){
    var fixText = 'None'

    if (text !== undefined){
        fixText = text.replace(/<b><b>/gi,'<b>');
        fixText = fixText.replace(/\[x]/gi,'');
        fixText = fixText.replace(/(\r\n|\n|\r)/gm, ' ');
        fixText = fixText.replace(/Lifesteal,/gi,'<b>Lifesteal</b>,');
        fixText = fixText.replace(/ Rush<\/b>/gi,' <b>Rush</b>,');
        fixText = fixText.replace(/<b>/gi,'**');
        fixText = fixText.replace(/<\/b>/gi,'**');
        fixText = fixText.replace(/<i>/gi,'*');
        fixText = fixText.replace(/<\/i>/gi,'*');
    }
    return fixText;
}

//---------------------------------------------------------------- deck ----------------------------------------------------------------

async function decodeDeck(deckStr) {
    let decoded;
    let HSAPI = await gh.fetchAPIJSON(hearsthoneAPI);
    let deckOrder = [];

    try {
        decoded = hsDeck.decode(deckStr);
    } catch {
        return "Please try again. Something went wrong."
    }
    decoded.cards.forEach(card => {
        HSAPI.forEach(search => {
            if(card[0] === search.dbfId) {
                deckOrder.push([search.name, card[1], search.cardClass, search.cost]);
            }
        });
    });

    deckOrder = deckOrder.sort(comparator);

    return deckEmbed(deckOrder, getHeroColor(decoded.heroes[0]));
}

function deckEmbed(deck,hero) {
    let neutralCard = '', classCard = '';

    deck.forEach(card => {
        if(card[2] === 'NEUTRAL') neutralCard += `${card[1]}x ${card[0]}\n`;
        else classCard += `${card[1]}x ${card[0]}\n`;
    });

    if (neutralCard.length == 0) {
        return new MessageEmbed()
        .setColor(hero[1])
        .setTitle(hero[0])
        .setURL('')
        .setThumbnail('')
        .addFields(
            { name: 'Class Cards', value: classCard, inline:true }
        )
    } else if (classCard.length == 0) {
        return new MessageEmbed()
        .setColor(hero[1])
        .setTitle(hero[0])
        .setURL('')
        .setThumbnail('')
        .addFields(
            { name: 'Neutral Cards', value: neutralCard, "inline": true}
        )
    } else {
        return new MessageEmbed()
        .setColor(hero[1])
        .setTitle(hero[0])
        .setURL('')
        .setThumbnail('')
        .addFields(
            { name: 'Class Cards', value: classCard, inline:true },
            { name: 'Neutral Cards', value: neutralCard, "inline": true}
        )
    }
}

function comparator(a, b) {
    if (a[3] < b[3]) return -1;
    if (a[3] > b[3]) return 1;
    if (a[3] == b[3]) return a[0].localeCompare(b[0])
    return 0;
 }

 function getHeroColor(heroID){
	switch(heroID){
        case 56550:
            return ['Demon Hunter', 1752220]
            break;
		case 274: //druid
		case 50484: //druid
		case 56358:
        case 73709: 
			return ['Druid', 5191455];
			break;
		case 31: //hunter
        case 71063:
			return ['Hunter', 3502628];
			break;
		case 637:
        case 71064: //mage
			return ['Mage', 37547];
			break;
		case 671: //paladin
        case 57757:
			return ['Paladin', 14068533];
			break;
		case 813: //priest
        case 71076:
			return ['Priest', 14870006];
			break;
		case 930: //rogue
        case 67522:
			return ['Rogue', 4408136];
			break;
		case 40183: //shaman
		case 1066: //shaman
        case 73709:
			return ['Shaman', 4343455];
			break;
		case 51834: //warlock
		case 893:
        case 67523:
			return ['Warlock', 7492484];
			break;
		case 7: //warrior
        case 61923:
			return ['Warrior', 10108216];
			break;
		default:
            return ['Unknown', 10108216];
			break;
	}
}