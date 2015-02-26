import Ember from 'ember';

export default Ember.Route.extend({
  model: function  () {
    return this.store.find("tweet");
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
            //"marker-symbol": 'cafe',
            'marker-size': 'small',
            'marker-color': '#4099ff'
            // "icon": {
            //   "iconUrl": "https://www.mapbox.com/maki/renders/airport-24@2x.png",
            //   "iconSize": [24, 24],

            //}
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
      // console.log(layer)

      //     //clusterGroup.addLayer(layer);
      // });

      // // map.addLayer(clusterGroup);
      // clusterGroup.addTo(map)

      // myLayer.addTo(map)
    })
  }
});
