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

// Define Function to Tweet
function tweetAboutContract (contract) {
    if (contract.Total_Transactions && contract.Contract_Description) {
        twit.updateStatus('The City spent $' + contract.Total_Transactions.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' on ' +  contract.Contract_Description,
          function (err, data) {
            if (err) {
              console.log(err);
            }
          }
        );
    }
}

// Set up Cron Job. Runs at 11:30 and 6:30 PM daily
new CronJob('30 11,17 * * *', function() {
  tweetAboutContract(q1[counter]);
  counter++;
}, null, true, 'America/New_York');
