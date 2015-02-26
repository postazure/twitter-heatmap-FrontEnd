import DS from 'ember-data';

export default DS.Model.extend({
  lat:        DS.attr("number"),
  lng:        DS.attr("number"),
  text:       DS.attr("string"),
  username:   DS.attr("string"),
  hashtags:   DS.hasMany("hashtag"),
});
