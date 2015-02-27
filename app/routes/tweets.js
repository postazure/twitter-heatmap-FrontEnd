import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function  (controller, model) {
    this.store.find("tweet").then(function(tweets){
      tweets = tweets.filter(function(tweet){
        return tweet.get('lat') && tweet.get('lng');
      })
      controller.set('model', tweets);
    })
    this._super(controller, model)
  },

  model: function  () {
    return [];
  }
});
