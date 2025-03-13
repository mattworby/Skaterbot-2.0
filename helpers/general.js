const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    capitalizeCorrectionHelper: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    fetchAPIJSON: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.text())
                .then(JSON.parse)
                .then(resolve)
                .catch(reject)
        });
    },
    fetchPostAPIJSON: (url) => {
        return new Promise((resolve, reject) =>{
            fetch(url, {
                method: "POST"
            })
            .then(res => res.json())
            .then(resolve)
            .catch(reject)
        })
    },
    saveConfig: (content) => {
        fs.writeFileSync('./configuration/botconfig.json', JSON.stringify(content));
    }
}