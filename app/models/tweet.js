import DS from 'ember-data';

export default DS.Model.extend({
  hashtag:  DS.attr(),
  lat:      DS.attr("number"),
  lng:      DS.attr("number"),
  text:     DS.attr(),
  username: DS.attr()
});
