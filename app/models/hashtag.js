import DS from 'ember-data';

export default DS.Model.extend({
  text:     DS.attr("string"),
  count:    DS.attr("number"),
  createdAt:  DS.attr("date"),
  updatedAt:  DS.attr("date"),
  tweets:   DS.hasMany("tweet", { async: true }),
});
