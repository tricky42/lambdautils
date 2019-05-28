const giphy = require('giphy-api');
const request = require('request').defaults({ encoding: null });
const giphy_api_key = process.env.GIPHY_API_KEY;

module.exports = {
    getGiphyImage : async function (term) {
        var api = giphy(giphy_api_key);
        try {
            var gres = await api.search(term);
            var imgData = await request( gres.data[0].images.original.url ) ;
            return imgData
        } catch (e) {
            console.log(e);
        }
    }   
}   