import Ember from 'ember';

export default Ember.View.extend({
  map: null,
  didInsertElement: function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoicG9zdGF6dXJlIiwiYSI6IkJYZVBuSjgifQ.YPwaTygKiks84wDu8DuejA';
    var map = L.mapbox.map('map', 'postazure.lalplidi').setView([37.7713,-122.439], 13); // can use .setView here to specify coordinates
    this.set("map", map)
    var myLayer = L.mapbox.featureLayer().addTo(map);
    this.set('myLayer', myLayer)
  },
  updateMap: function  () {
    var myLayer = this.get('myLayer');
    var tweets = this.controller.get("model");

    if(!myLayer || !tweets.get('length') > 0){
      return;
    }

    var pinInfo = [];
    var geojson = {
      "type": "FeatureCollection",
      "features": []
    };

    tweets.forEach(function (tweet) {


      var coords = [tweet.get("lng"), tweet.get("lat")];
      var text = tweet.get("text")
      
      if (text) {
      var linkURL = text.match(/http\S{2,}/g)
      var text = text.replace(linkURL,"<a target='_blank' href='"+ linkURL +"'>"+ linkURL +"</a>")
      };

      pinInfo.push(
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": coords
          },
          "properties": {
            "title": tweet.get("username") + "<hr>",
            "description": text + "<hr>" + tweet.get("createdAt"),
            'marker-size': 'small',
            'marker-color': '#0088cc'
          }
        }
      );

    });

    geojson.features = pinInfo;

    
    myLayer.setGeoJSON(geojson);
  }.observes('controller.sortedTweetsDesc.length', 'myLayer'),

  actions: {
    panToPin: function  (tweet) {

      var map = this.map;
      var lat = tweet.get("lat");
      var lng = tweet.get("lng");
      var text = tweet.get("text")
      
      if (text) {
      var linkURL = text.match(/http\S{2,}/g)
      var text = text.replace(linkURL,"<a target='_blank' href='"+ linkURL +"'>"+ linkURL +"</a>")
      };
      
      var markerjson = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [lng, lat]
            },
            "properties": {
              "title": tweet.get("username") + "<hr>",
              "description": text + "<hr>" + tweet.get("createdAt"),
              'marker-size': 'small',
              'marker-color': '#0088cc'
            }
          }
        ]
      }
      var newPinLayer = L.mapbox.featureLayer(markerjson)
      
      newPinLayer.addTo(map)
      newPinLayer.openPopup();

      map.setView([lat, lng], 14);
    }
  }
});
