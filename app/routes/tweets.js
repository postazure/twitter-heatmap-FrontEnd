import Ember from 'ember';

export default Ember.Route.extend({
  
  map: null,
  setupController: function  (controller, model) {
    this.store.find("tweet").then(function(tweets){
      controller.set('model', tweets);
    })
    this._super(controller, model)
  },

  model: function  () {
    return [];
  },

  actions: {
    panToPin: function  (tweet) {
      return;
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
});
