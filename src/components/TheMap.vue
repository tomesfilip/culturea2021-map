<template>
  <nav v-show="menuShowed" id="mobile-menu" class="h-screen flex md:hidden flex-col items-center px-2 mobile:px-6 py-4 bg-green overflow-x-hidden text-xl">
    <MenuSearchBox class="h-1/6 max-h-16" />
    <ul class="menu-items w-full h-full mt-4 mobile:mt-6 flex flex-col items-center text-white">
      <div class="menu-item-mob w-4/5 mobile:w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
        <MenuItem :menuItem="menuItem" class="h-12 sm-mobile:h-16 my-4" />
        <hr class="border-t-2 rounded" v-if="!menuItem.isLast">
      </div>      
    </ul>
    <div class="close-btn h-1/6">
      <CloseBtn class="p-2" @click="menuShowed = false" />
    </div>
  </nav>
  <SidebarMenu class="fixed z-20" :menuItems="menuItems" />
  <div v-show="!menuShowed">
    <div id="mapContainer" class="basemap absolute"></div>
    <MobMapHeader class="absolute top-10" />
    <HamburgerBtn @click="menuShowed = true" class="block md:hidden absolute bottom-10 ml-6 mb-7" />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MobMapHeader from './MobMapHeader.vue'
import HamburgerBtn from './HamburgerButton.vue'

import SidebarMenu from './SidebarMenu.vue'

import MenuSearchBox from './MenuSearchBox.vue'
import MenuItem from './MenuItem.vue'
import CloseBtn from './CloseButton.vue'

import CutleryIcon from '@/assets/img/cutlery.svg'
import FlowerIcon from '@/assets/img/flower.svg'
import MessageIcon from '@/assets/img/message.svg'
import HandIcon from '@/assets/img/hand.svg'
import EyeIcon from '@/assets/img/eye.svg'

export default {
  name: "BaseMap",
  components: { SidebarMenu, MobMapHeader, HamburgerBtn, MenuSearchBox, MenuItem, CloseBtn },

  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_KEY,
      map: null,
      isMob: true,
      menuShowed: false,
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
      const position = this.isMobWidth() ? "top-left" : "top-right"
      this.map.addControl(nav, position)
      this.map.addControl(geoLocate, position)
    },
    isMobWidth() {
      return (window.innerWidth < 768)
    },
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

    .mapboxgl-ctrl-top-left {
      top: 56%;
    }

    .mapboxgl-ctrl-group {
      margin-left: 1.5rem;
      background: none;
      box-shadow: none;

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