import Ember from 'ember';

export default Ember.Route.extend({
  map: null,
  model: function  () {
    return this.store.find("tweet");
  },
  actions: {
    panToPin: function  (tweet) {
      var map = this.map;
      var lat = tweet.get("lat");
      var lng = tweet.get("lng");
      var text = tweet.get("text")
      
      if (text) {
      var linkURL = text.match(/http:\S{2,}/g)
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
  },

  activate: function () {
    var tweets = this.modelFor(this.routeName);

    var pinInfo = [];
    var geojson = {
      "type": "FeatureCollection",
      "features": []
    };

    tweets.forEach(function (tweet) {

      var coords = [tweet.get("lng"), tweet.get("lat")];
      var text = tweet.get("text")
      
      if (text) {
      var linkURL = text.match(/http:\S{2,}/g)
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

    setTimeout(() =>{
      L.mapbox.accessToken = 'pk.eyJ1IjoicG9zdGF6dXJlIiwiYSI6IkJYZVBuSjgifQ.YPwaTygKiks84wDu8DuejA';

      var map = L.mapbox.map('map')
        .setView([37.7713,-122.439], 13) // can use .setView here to specify coordinates
        .addLayer(L.mapbox.tileLayer('postazure.lalplidi'));

      this.set("map", map)

      var myLayer = L.mapbox.featureLayer().addTo(map);
      myLayer.setGeoJSON(geojson);


      // var markers = new L.MarkerClusterGroup();
      // markers.addLayer(new L.Marker(getRandomLatLng(map)));
      // // ... Add more layers ...
      // map.addLayer(markers);


      // var myLayer = L.mapbox.featureLayer(geojson);
      // var markers = new L.MarkerClusterGroup();
      // var clusterGroup = new L.MarkerClusterGroup();
      // myLayer.eachLayer(function(layer) {
      

      //     //clusterGroup.addLayer(layer);
      // });

      // // map.addLayer(clusterGroup);
      // clusterGroup.addTo(map)

      // myLayer.addTo(map)
    })
  }
});
