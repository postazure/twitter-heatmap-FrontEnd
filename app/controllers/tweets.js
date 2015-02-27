import Ember from 'ember';

export default Ember.Controller.extend({
  tweetsSortingDesc: ['id:desc'],
  sortedTweetsDesc: Ember.computed.sort('model', 'tweetsSortingDesc')
});
