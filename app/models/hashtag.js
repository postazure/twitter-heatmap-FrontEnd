import DS from 'ember-data';

export default DS.Model.extend({
  text:     DS.attr("string"),
  count:    DS.attr("number"),
  tweets:   DS.hasMany("tweet"),
});
