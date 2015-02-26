import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('tweets', function() {
    this.route('show', {path: "/:tweet_id"});
  });
  this.resource('hashtags', function() {
    this.route('show', {path: "/:tweet_id"});
  });
});

export default Router;
