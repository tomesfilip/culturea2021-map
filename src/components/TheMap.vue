<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_KEY,
      center: [37,7749, -122,4194],
      map: null,
      titleLayer: null,
      layers: [],
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
    }
  },
  mounted() {
    this.initMap()
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "top-right");
  }
  
}
</script>

<style>
  .basemap {
    width: 100%;
    height: 100vh;
  }
</style>