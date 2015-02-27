import Ember from 'ember';

export default Ember.Controller.extend({
  tweetsSortingDesc: ['count:desc'],
  sortedTweetsDesc: Ember.computed.sort('model', 'tweetsSortingDesc'),
});
