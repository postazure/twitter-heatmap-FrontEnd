export default Ember.View.extend({

  didInsertElement: function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoicG9zdGF6dXJlIiwiYSI6IkJYZVBuSjgifQ.YPwaTygKiks84wDu8DuejA';
    var map = L.mapbox.map('map', 'postazure.lalplidi').setView([37.7713,-122.439], 13); // can use .setView here to specify coordinates

    var myLayer = L.mapbox.featureLayer().addTo(map);
    this.set('myLayer', myLayer)
  },
  updateMap: function(){
    var myLayer = this.get('myLayer')
    var hashtags = this.controller.get('activeHashtags');

    if(!myLayer || !hashtags.get('length') > 0){
      return;
    }


    var pinInfo = [];
    var geojson = {
      "type": "FeatureCollection",
      "features": []
    };

    
    hashtags.forEach(function (hashtag) {

      var tweets = hashtag.get("tweets");

      tweets.forEach(function  (tweet) {
        var lat = tweet.get("lat");
        var lng = tweet.get("lng");
        var coords = [lng, lat];
        var title = "#" + hashtag.get("text");

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
              'marker-size': 'small',
              'marker-color': '#0088cc'
              
            }
          }
        );

      });
    });

    geojson.features = pinInfo;

    
    myLayer.setGeoJSON(geojson);
  }.observes('controller.activeHashtags.length', 'myLayer')

})