<template>
  <div id="mapContainer" class="basemap"></div>
  <MapSearchBox class="absolute top-10 right-10 " />
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapSearchBox from './MapSearchBox.vue'

export default {
  name: "BaseMap",
  components: { MapSearchBox },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_KEY,
      center: [37,7749, -122,4194],
      map: null,
      titleLayer: null,
      layers: [],
      isMob: true,
    }
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = this.accessToken
      this.map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/f-tomes/ckl27l6x413dx17mvv50wti7j",
        center: [17.674, 49.225],
        zoom: 13,
        minZoom: 13,
        maxZoom: 18,
        maxBounds: [
          [17.3, 49.0],
          [17.9, 49.3],
        ],
      })
    },
    addControlsToMap() {
      const nav = new mapboxgl.NavigationControl()
      const geoLocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccurracy: true
        },
        trackUserLocation: true
      })
      const position = this.isMobWidth() ? "bottom-left" : "top-right"
      this.map.addControl(nav, position)
      this.map.addControl(geoLocate, position)
    },

    isMobWidth() {
      return (window.innerWidth < 768)
    }
    

  },
  mounted() {
    this.isMobWidth()
    this.initMap()    
    this.addControlsToMap()
  }
  
}
</script>

<style>
  .basemap {
    width: 100%;
    height: 100vh;
  }
  .mapboxgl-ctrl-bottom-left {
    bottom: 30px;
  }
</style>