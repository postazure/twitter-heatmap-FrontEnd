import Ember from 'ember';

export default Ember.Route.extend({
  model: function  () {
    return this.store.find("tweet")
  },
  activate: function () {
    var tweets = this.modelFor(this.routeName)
    
    var pinInfo = []
    var geojson = {
      "type": "FeatureCollection",
      "features": []
    }

    tweets.forEach(function (tweet) {

      var coords = [tweet.get("lng"), tweet.get("lat")];

      pinInfo.push(
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": coords
          },
          "properties": {
            "title": tweet.get("username") + "<hr>",
            "description": tweet.get("text"),
          }
        }
      );

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
