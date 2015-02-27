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
    
  },
});
