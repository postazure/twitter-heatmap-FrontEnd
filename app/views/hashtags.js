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

      // console.log("hashtag",hashtag)

      var tweets = hashtag.get("tweets");
      if (!tweets) {
        console.log("tweetlist", tweets)
      };

      tweets.forEach(function  (tweet) {
        
        // console.log("tweet",tweet)


        var lat = tweet.get("lat");
        var lng = tweet.get("lng");
        var coords = [lng, lat];
        var title = "#" + hashtag.get("text");

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
              "title": title + "<hr>",
              "description": text + "<hr> by " + tweet.get("username"),
              'marker-size': 'small',
              'marker-color': '#0088cc'
              
            }
          }
        );

      });
    });

    geojson.features = pinInfo;

    
    myLayer.setGeoJSON(geojson);
    
    // console.log(this.controller.get("activeHashtags"))
    // var group = new L.featureGroup(this.controller.activeHashtags);
    // map.fitBounds(group.getBounds());
  }.observes('controller.activeHashtags.length', 'myLayer')

})