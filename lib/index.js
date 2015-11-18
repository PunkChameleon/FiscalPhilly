var Twitter = require('twode'),
    _ = require('underscore'),
    CronJob = require('cron').CronJob;
    config = require('./lib/config'),
    fs = require("fs"),
    readFile = fs.readFileSync("./data/FY2016Q1.json", "UTF-8"),
    q1 = JSON.parse(readFile),
    counter = 0,
    twit = new Twitter({
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
    });

// Cron Job
// 30      6,15     *       *       *

function tweetAboutContract (contract) {
    if (contract.Total_Transactions && contract.Contract_Description) {
        console.log('This quarter, the City spent ' + contract.Total_Transactions + " on " +  contract.Contract_Description + "."); 
    }
}

new CronJob('30      11,17     *       *       *', function() {
  tweetAboutContract(q1[counter]);
}, null, true, 'America/Philadelphia');