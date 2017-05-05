console.log('The bot is starting...');

var Twit = require('twit'),
    Bitly = require('bitly'),
    bitly = new Bitly('62df68a76f38974df32808cbed6d063996fe993f'),
    config = require('./config'),
    word = require('./words'),
    T = new Twit(config);

function init() {
    var tweetingStart = setInterval(function() {
        
        loop()
        
        init();
        clearInterval(tweetingStart);
    }, 3600000);
}

function tweeting(content) {
    var nContent = {
        status: content
    };
    T.post('statuses/update', nContent, function(err, data, res) {
        if (err)
            console.log(err);
        else
            console.log('Twitted ! : ' + content);
    });
}

function loop() {
    var ranWord = word.get(),
        url;
    
    bitly.shorten('http://www.wordreference.com/fren/' + ranWord)
        .then(function(response) {
            url = response.data.url;
            tweeting('The random word of this hour is "' + ranWord + '". More information here -> ' + url + ' #RandomWord #RandomFrenchWord');
        }, function(error) {
            throw error;
        });
}

loop();
init();
