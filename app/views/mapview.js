export default EmberLeaflet.MapView.extend({
  classNames : ['ember-leaflet-map'],
  center: L.latLng(40.713282, -74.006978),
   zoom: 18,
   options: {maxZoom: 19, minZoom: 0}
});
