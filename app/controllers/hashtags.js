import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['count'],
  sortAscending: false
});