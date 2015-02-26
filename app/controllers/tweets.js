import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    testClick: function() {
      console.log("click");

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
                        },
                        // {
                        //   "type": "Feature",
                        //   "geometry": {
                        //     "type": "Point",
                        //     "coordinates": [-122.423315547721, 37.7811982218612]
                        //   },
                        //   "properties": {}
                        // }
                      ]
                    }];

      var myLayer = L.mapbox.featureLayer().addTo(map);
      myLayer.setGeoJSON(geojson);
    }
  }
});
