import Ember from 'ember';


export default EmberLeaflet.MapView.extend({
  center: L.latLng(37.787746, -122.397010),
  zoom: 13,
  option: {maxZoom: 19, minZoom: 0},
  // childLayers: [
  //   EmberLeaflet.DefaultTileLayer,
  //   app.MarkerCollectionLayer
  // ]
});
