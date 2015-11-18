var Twitter = require('twode'),
    _ = require('underscore'),
    config = require('./lib/config'),
    fs = require("fs"),
    readFile = fs.readFileSync("./data/FY2016Q1.json", "UTF-8"),
    q1 = JSON.parse(readFile),
    twit = new Twitter({
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
    });

_.each(q1, function (contract) {
  if (contract.Total_Transactions && contract.Contract_Description) {
    console.log('This quarter, we spent $' + contract.Total_Transactions + " for " +  contract.Contract_Description + ". xoxo Philly"); 
  }
});