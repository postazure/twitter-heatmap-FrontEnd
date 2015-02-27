import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.ActiveModelAdapter.extend({
  // host: ENV.adapterURL || ENV.ADAPTER_URL
  // host: "https://postazure-twitter-heatmap.herokuapp.com/"
  host: "http://localhost:3000"
});
