import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function  (controller, model) {
    this.store.find("hashtag").then(function(hashtags){
      controller.set('model', hashtags);
    })
    this._super(controller, model)
  },
  model: function  () {
    return []
  }
});
