export default EmberLeaflet.MapView.extend({
  //classNames : ['ember-leaflet-map'],
  contentBinding: 'controller',
  childLayers: [
    EmberLeaflet.DefaultTileLayer,
    EmberLeaflet.MarkerCollectionLayer]
  });
