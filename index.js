const g = require("./src/giphy.js");
const t = require("./src/twitter.js");

exports.printMsg = function() {
  console.log("You now possess the power to alter all aspects of the web universe!");
}

async function postOnTwitterGiphy (tweet, searchTerm) {
  var regex = /&#x20;/gi;
  var cleanText = searchTerm.replace(regex," ");
  var data = await g.getGiphyImage(cleanText);
  t.postOnTwitterWithImage(tweet + " " + cleanText, data);
}

module.exports = {
    getGiphyImage: g.getGiphyImage,
    postOnTwitterWithImage: t.postOnTwitterWithImage,
    tweet: t.postOnTwitter,
    tweetGiphy: postOnTwitterGiphy,
}

// async function main() {
//   try {
//     var data = await g.getGiphyImage("pokemon");
//     t.postOnTwitterWithImage("Thanos is coming!", data);
//   } catch (e){
//     console.log(e);
//     return e;
//   }
// }

// main();