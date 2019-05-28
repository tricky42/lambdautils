var Twitter = require('twitter');
 
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET 
  });
  
module.exports = {
    postOnTwitterWithImage: function (tweet, image) {

        // Make post request on media endpoint. Pass file data as media parameter
        client.post('media/upload', { media: image }, function (error, media, response) {

            if (error) {
                console.log("Oops something went wrong");
                console.log(error);
            } else {

                // If successful, a media object will be returned.
                console.log(`Media with id ${media.media_id_string} successfully created`);

                // Lets tweet it
                var status = {
                    status: tweet,
                    media_ids: media.media_id_string // Pass the media id string
                }

                client.post('statuses/update', status, function (error, tweet, response) {
                    if (error) {
                        console.log("Oops something went wrong");
                        console.log(error);
                    } else { 
                        console.log(`Tweet with id ${tweet.id} successfully posted`);
                    }
                });

            }
        });
    },
    postOnTwitter: function (tweet) {
        var regex = /&#x20;/gi;
        var cleanTweet = tweet.replace(regex," ");

        var status = {
            status: cleanTweet
        }
      
        client.post('statuses/update', status, function (error, tweet, response) {
            if (error) {
                console.log("Oops something went wrong");
                console.log(error);
            } else { 
                console.log(response);
                console.log(`Tweet with id ${tweet.id} successfully posted`);
            }
        });
    }
};