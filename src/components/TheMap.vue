<template>
  <nav v-show="menuShowed" id="mobile-menu" class="h-screen flex md:hidden flex-col items-center px-2 mobile:px-6 py-4 bg-green overflow-x-hidden text-xl">
    <MenuSearchBox class="h-1/6 max-h-16" />
    <MobMenuItems :menuItems="menuItems" />    
    <div class="close-btn h-1/6">
      <CloseBtn class="p-2" @click="menuShowed=false"/>
    </div>
  </nav>
  <SidebarMenu class="fixed z-20" :menuItems="menuItems" />
  <div v-show="!menuShowed">
    <MarkerDetail v-if="mapItem" :mapItem="mapItem" class="fixed bottom-0 z-20" @click="toggleActiveMarker" :class="{ 'marker-active' : isActive}">
      <template v-slot:mobCloseBtn>
        <CloseBtn class="h-12 w-12" @click="mapItem=null" />
      </template>
      <template v-slot:closeBtn>
        <CloseBtn @click="mapItem=null" />
      </template>
    </MarkerDetail>  
    <div id="mapContainer" class="basemap absolute"></div>
    <MobMapHeader class="absolute top-10" />
    <HamburgerBtn @click="menuShowed=true" class="block md:hidden absolute bottom-10 ml-6 mb-7" />
    <div v-for="feature in mapFeatures" :key="feature.id">
      <p>{{ feature.geometry.coordinates }}</p>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

import MobMapHeader from './MobMapHeader.vue'
import HamburgerBtn from './HamburgerButton.vue'
import SidebarMenu from './SidebarMenu.vue'
import MenuSearchBox from './MenuSearchBox.vue'
import MobMenuItems from './MobMenuItems.vue'
import CloseBtn from './CloseButton.vue'
import MenuItem from './MenuItem.vue'
import MarkerDetail from './MarkerDetail.vue'

import CutleryIcon from '@/assets/img/cutlery.svg'
import FlowerIcon from '@/assets/img/flower.svg'
import MessageIcon from '@/assets/img/message.svg'
import HandIcon from '@/assets/img/hand.svg'
import EyeIcon from '@/assets/img/eye.svg'

export default {
  name: "BaseMap",
  components: { MenuItem, SidebarMenu, MobMenuItems, MobMapHeader, HamburgerBtn, MenuSearchBox, CloseBtn, MarkerDetail },

  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_KEY,
      datasetID: 'cklfg01lb0ctb2amxveaqgpcf',
      map: null,
      isMob: true,
      isActive: false,
      menuShowed: false,
      mapItem: null,
      mapFeatures: [],
      menuItems: [
        {
          url: '#',
          icon: FlowerIcon,
          iconName: 'flower icon',
          title: 'Výstavy',
        },
        {
          url: '#',
          icon: MessageIcon,
          iconName: 'message icon',
          title: 'Přednášky',
        },
        {
          url: '#',
          icon: HandIcon,
          iconName: 'hand icon',
          title: 'Tipy',
        },
        {
          url: '#',
          icon: EyeIcon,
          iconName: 'eye icon',
          title: 'Kulturní akce',
        },
        {
          url: '#',
          icon: CutleryIcon,
          iconName: 'cutlery icon',
          title: 'Tradiční jídlo',
          isLast: true
        },
      ],
    }
  },

  methods: {
    initMap() {
      mapboxgl.accessToken = this.accessToken
      this.map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/f-tomes/ckl27l6x413dx17mvv50wti7j",
        center: [17.6670, 49.2257],
        zoom: 14,
        minZoom: 13,
        maxZoom: 18,
        // max boundaries: 1. value: south-west coordinates, 2. value: north-east coordinates
        maxBounds: [
          [17.6205, 49.2090],
          [17.7190, 49.2465],
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
      const position = this.isMobWidth() ? "top-left" : "top-right"
      this.map.addControl(nav, position)
      this.map.addControl(geoLocate, position)
    },
    async getDataSet() {
      try {
        const res = await fetch(`https://api.mapbox.com/datasets/v1/f-tomes/${this.datasetID}/features?access_token=${this.accessToken}`)
        const data = await res.json()
        const features = data.features
        this.mapFeatures = features
        features.forEach((feature) => {
          this.addMarkerToMap(feature)
        })
      }
      catch(err) {
        console.log(err)
      }
    },    
    isMobWidth() {
      return (window.innerWidth < 768)
    },
    async addMarkerToMap(feature) {
      const el = document.createElement('div')
      el.className = 'marker'
      if(feature.geometry.type === 'Point') {
        el.classList.add('marker-restaurant')
        el.addEventListener('click', () => {
          const elems = document.getElementsByClassName('marker-restaurant')
          for(let i = 0; i < elems.length; i++) {
            elems[i].classList.remove('marker-restaurant-active')
          }      
          el.classList.add('marker-restaurant-active')
        })
      }
      const coords = feature.geometry.coordinates
      const marker = await new mapboxgl.Marker(el)
        .setLngLat([coords[0], coords[1]])
        .addTo(this.map)
      marker.getElement().addEventListener('click', () => {
        this.mapItem = feature

      })
    },
    toggleActiveMarker() {
      this.isActive = !this.isActive
    }
  },

  created() {
    this.getDataSet()
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

    .marker-restaurant {
      background-image: url('../assets/img/markers/restaurant.svg');
    }

    .marker-restaurant-active {
      background-image: url('../assets/img/markers/restaurant-active.svg');
    }

    .marker-message {
      background-image: url('../assets/img/markers/message.svg');
    }

    .marker-hand {
      background-image: url('../assets/img/markers/hand.svg');
    }

    .marker-eye {
      background-image: url('../assets/img/markers/eye.svg');
    }

    .marker-smell {
      background-image: url('../assets/img/markers/smell.svg');
    }

    .marker {
      background-size: contain;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }

    .mapboxgl-ctrl-top-left {
      top: unset;
      bottom: 23vh;

      @media screen and(min-width: 374px) {
        bottom: 19vh;
      }

      @media screen and(min-width: 413px) {
        bottom: 17vh;
      }
    }

    .mapboxgl-ctrl-group {
      margin-left: 1.5rem;
      background: none;
      box-shadow: none;

      .mapboxgl-ctrl-geolocate {
        @media screen and(max-width: 768px) {
        margin-bottom: 1rem;
      }
      }

      .mapboxgl-ctrl-zoom-in, .mapboxgl-ctrl-zoom-out {
        display: none;
      }

      button {
        width: 3rem;
        height: 3rem;
        margin-bottom: 0.2rem;
        background: black;
        border-radius: 100%;

        &:not(:disabled):hover {
          border-radius: 100%;
          background: black;
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
          border-radius: 0;
          margin-bottom: 0.6rem;

          &:not(:disabled):hover {
            border-radius: 0;
          }
        }
      }
    }
  }
</style>