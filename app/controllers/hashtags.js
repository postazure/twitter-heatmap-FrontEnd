import Ember from 'ember';

export default Ember.Controller.extend({
  hashtagsSortingDesc: ['count:desc'],
  sortedHashtagsDesc: Ember.computed.sort('model', 'hashtagsSortingDesc'),
  activeHashtags: [],
  actions: {
    activateHashtag: function  (hashtag) {
      // console.log("Activating Hashtag:", hashtag)
      this.set("activeHashtags", [hashtag])
      // console.log("activeHashtags after: ", this.get("activeHashtags"))
    }
  }
});