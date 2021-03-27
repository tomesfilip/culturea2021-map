<template>
  <div id="mapContainer" class="basemap"></div>
  <MapSearchBox class="block w-2/3 md:hidden absolute top-10 right-10 " />
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
      map: null,
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
          [17.600, 49.190],
          [17.748, 49.260],
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

<style lang="scss">
  .basemap {
    width: 100%;
    height: 100vh;

    .mapboxgl-ctrl-bottom-left {
      bottom: 30px;
    }

    .mapboxgl-ctrl-group {
      margin-left: 1.4rem;
      background: none;
      box-shadow: none;

      .mapboxgl-ctrl-zoom-in, .mapboxgl-ctrl-zoom-out {
        display: none;
      }

      button {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.2rem;
        background: black;

        &:not(:disabled):hover {
          background: black;
          border-radius: 0;
        }

        .mapboxgl-ctrl-icon {
          filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(37deg) brightness(105%) contrast(101%);
        }
      }

      @media screen and(min-width: 768px) {
        margin: 2rem;

        .mapboxgl-ctrl-zoom-in, .mapboxgl-ctrl-zoom-out {
          display: block;
        }

        button {
          width: 3rem;
          height: 3rem;
          margin-bottom: 0.6rem;
        }
      }
    }
  }
</style>