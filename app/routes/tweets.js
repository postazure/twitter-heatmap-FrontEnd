import Ember from 'ember';

export default Ember.Route.extend({
  model: function  () {
    return this.store.find("tweet")
  },
  activate: function () {
    setTimeout(function() {
      L.mapbox.accessToken = 'pk.eyJ1IjoicG9zdGF6dXJlIiwiYSI6IkJYZVBuSjgifQ.YPwaTygKiks84wDu8DuejA';
      var map = L.mapbox.map('map', 'laurenjrichie.ladp904d').setView([37.7713,-122.439], 13); // can use .setView here to specify coordinates

      var geojson = [{
                      "type": "FeatureCollection",
                      "features": [
                        {
                          "type": "Feature",
                          "geometry": {
                            "type": "Point",
                            "coordinates": [-122.388078331989, 37.7667867792956]
                          },
                          "properties": {}
                        }
                      ]
                    }];

      var myLayer = L.mapbox.featureLayer().addTo(map);
      myLayer.setGeoJSON(geojson);
    })
  }
});
