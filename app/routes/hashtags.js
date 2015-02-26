import Ember from 'ember';

export default Ember.Route.extend({
  model: function  () {
    return this.store.find("hashtag")
  },
  activate: function () {
    var hashtags = this.modelFor(this.routeName)

    // tweets.forEach(function (tweet) {
    //   console.log(tweet.get("lat"));
    //   console.log(tweet.get("lng"));
    //   console.log(tweet.get("text"));
    //   tweet.get("hashtags").forEach(function (hashtag) {
    //     console.log(hashtag.get("text"));
    //   })
    // })
    var pinInfo = []
    var geojson = {
      "type": "FeatureCollection",
      "features": []
    }

    hashtags.forEach(function (hashtag) {
      console.log(hashtag.get("tweets"))

      var tweets = hashtag.get("tweets")

      tweets.forEach(function  (tweet) {
        var lat = tweet.get("lat")
        var lng = tweet.get("lng")
        var coords = [lng, lat];
        var title = "#" + hashtag.get("text")
        
        pinInfo.push(
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": coords
            },
            "properties": {
              "title": title + "<hr>",
              "description": tweet.get("text") + "<hr> by " + tweet.get("username"),
            }
          }
        );

      })
    })

    geojson.features = pinInfo

    setTimeout(() =>{
      L.mapbox.accessToken = 'pk.eyJ1IjoicG9zdGF6dXJlIiwiYSI6IkJYZVBuSjgifQ.YPwaTygKiks84wDu8DuejA';
      var map = L.mapbox.map('map', 'laurenjrichie.ladp904d').setView([37.7713,-122.439], 13); // can use .setView here to specify coordinates

      var myLayer = L.mapbox.featureLayer().addTo(map);
      myLayer.setGeoJSON(geojson);
    })
  }
});
