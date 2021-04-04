<template>
  <MobMenu v-show="menuShowed">
    <template v-slot:removeFiltersMobBtn>
      <transition name="fade-bottom">
        <RemoveFiltersBtn v-show="isFiltered" @click="showAllMarkers" />
      </transition>
    </template>
    <template v-slot:menuItem>
      <div class="menu-item-mob w-4/5 mobile:w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
        <MenuItem :menuItem="menuItem" class="h-12 sm-mobile:h-16 my-4" @click="showOnly(menuItem.sense)" />
        <hr class="border-t-2 rounded" v-if="!menuItem.isLast">
      </div>
    </template>
    <template v-slot:mobMenuCloseBtn>
      <CloseBtn class="p-2" @click="menuShowed=false" />
    </template>
  </MobMenu>
  <transition name="fade-left">
    <SidebarMenu class="fixed z-20" :menuItems="menuItems">
      <template v-slot:removeFiltersBtn>
        <transition name="fade-left">
          <RemoveFiltersBtn v-show="isFiltered" @click="showAllMarkers" />
        </transition>
      </template>
      <template v-slot:menuItem>
        <div class="menu-item w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
          <MenuItem :menuItem="menuItem" class="h-16 my-4 hover:opacity-90" @click="showOnly(menuItem.sense)"/>
        </div>
      </template>
    </SidebarMenu>
  </transition>  
  <div v-show="!menuShowed">
    <transition name="fade-bottom">
      <MarkerDetail v-if="mapItem" :mapItem="mapItem" class="fixed bottom-0 z-20">
        <template v-slot:mobCloseBtn>
          <CloseBtn class="h-12 w-12" @click="mapItem=null" />
        </template>
        <template v-slot:closeBtn>
          <CloseBtn @click="mapItem=null" class="close-btn"/>
        </template>
      </MarkerDetail>  
    </transition>
    <div id="mapContainer" class="basemap absolute"></div>
    <MobMapHeader class="absolute top-10" />
    <HamburgerBtn @click="menuShowed=true" class="block md:hidden absolute bottom-10 ml-6 my-7" />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

import MobMapHeader from './MobMapHeader.vue'
import HamburgerBtn from './HamburgerButton.vue'
import SidebarMenu from './SidebarMenu.vue'
import MobMenu from './MobMenu.vue'
import CloseBtn from './CloseButton.vue'
import MenuItem from './MenuItem.vue'
import MarkerDetail from './MarkerDetail.vue'
import RemoveFiltersBtn from './RemoveFiltersBtn.vue'

import CutleryIcon from '@/assets/img/cutlery.svg'
import FlowerIcon from '@/assets/img/flower.svg'
import MessageIcon from '@/assets/img/message.svg'
import HandIcon from '@/assets/img/hand.svg'
import EyeIcon from '@/assets/img/eye.svg'

export default {
  name: "BaseMap",
  components: { MenuItem, SidebarMenu, MobMenu, MobMapHeader, HamburgerBtn, CloseBtn, MarkerDetail, RemoveFiltersBtn },

  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_KEY,
      datasetID: 'cklfg01lb0ctb2amxveaqgpcf',
      map: null,
      menuShowed: false,
      mapItem: null,
      isFiltered: false,
      mapFeatures: [],
      menuItems: [
        {
          url: '#',
          icon: FlowerIcon,
          iconName: 'flower icon',
          title: 'Výstavy',
          sense: 'cuch'
        },
        {
          url: '#',
          icon: MessageIcon,
          iconName: 'message icon',
          title: 'Přednášky',
          sense: 'sluch'
        },
        {
          url: '#',
          icon: HandIcon,
          iconName: 'hand icon',
          title: 'Tipy',
          sense: 'hmat'
        },
        {
          url: '#',
          icon: EyeIcon,
          iconName: 'eye icon',
          title: 'Kulturní akce',
          sense: 'zrak'
        },
        {
          url: '#',
          icon: CutleryIcon,
          iconName: 'cutlery icon',
          title: 'Tradiční jídlo',
          sense: 'chut',
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
      const elems = document.getElementsByClassName('marker')

      if(feature.properties.sense === 'chut') {
        el.classList.add('marker-restaurant')
        el.addEventListener('click', () => {
          for(let i = 0; i < elems.length; i++) {
            elems[i].classList.remove('marker-restaurant-active')
            elems[i].classList.remove('marker-hand-active')
            elems[i].classList.remove('marker-message-active')
            elems[i].classList.remove('marker-smell-active')
            elems[i].classList.remove('marker-eye-active')
          }      
          el.classList.add('marker-restaurant-active')
        })
      }

      if(feature.properties.sense === 'cuch') {
        el.classList.add('marker-smell')
        el.addEventListener('click', () => {
          for(let i = 0; i < elems.length; i++) {
            elems[i].classList.remove('marker-restaurant-active')
            elems[i].classList.remove('marker-hand-active')
            elems[i].classList.remove('marker-message-active')
            elems[i].classList.remove('marker-smell-active')
            elems[i].classList.remove('marker-eye-active')
          }      
          el.classList.add('marker-smell-active')
        })
      }

      if(feature.properties.sense === 'hmat') {
        el.classList.add('marker-hand')
        el.addEventListener('click', () => {
          for(let i = 0; i < elems.length; i++) {
            elems[i].classList.remove('marker-restaurant-active')
            elems[i].classList.remove('marker-hand-active')
            elems[i].classList.remove('marker-message-active')
            elems[i].classList.remove('marker-smell-active')
            elems[i].classList.remove('marker-eye-active')
          }      
          el.classList.add('marker-hand-active')
        })
      }

      if(feature.properties.sense === 'sluch') {
        el.classList.add('marker-message')
        el.addEventListener('click', () => {
          for(let i = 0; i < elems.length; i++) {
            elems[i].classList.remove('marker-restaurant-active')
            elems[i].classList.remove('marker-hand-active')
            elems[i].classList.remove('marker-message-active')
            elems[i].classList.remove('marker-smell-active')
            elems[i].classList.remove('marker-eye-active')
          }      
          el.classList.add('marker-message-active')
        })
      }

      if(feature.properties.sense === 'zrak') {
        el.classList.add('marker-eye')
        el.addEventListener('click', () => {
          for(let i = 0; i < elems.length; i++) {
            elems[i].classList.remove('marker-restaurant-active')
            elems[i].classList.remove('marker-hand-active')
            elems[i].classList.remove('marker-message-active')
            elems[i].classList.remove('marker-smell-active')
            elems[i].classList.remove('marker-eye-active')
          }      
          el.classList.add('marker-eye-active')
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
    showOnly(itemSense) {
      const markers = document.getElementsByClassName('marker')
      this.menuShowed = false
      this.isFiltered = true
      switch(itemSense) {
        case 'chut':
          for(let i = 0; i < markers.length; i++) {
            markers[i].classList.remove('hidden')
            if (!markers[i].classList.contains('marker-restaurant')) {
              markers[i].classList.add('hidden')
            }
          }
          break
        
        case 'cuch':
          for(let i = 0; i < markers.length; i++) {
            markers[i].classList.remove('hidden')
            if (!markers[i].classList.contains('marker-smell')) {
              markers[i].classList.add('hidden')
            }
          }
          break
        
        case 'hmat':
          for(let i = 0; i < markers.length; i++) {
            markers[i].classList.remove('hidden')
            if (!markers[i].classList.contains('marker-hand')) {
              markers[i].classList.add('hidden')
            }
          }
          break

        case 'sluch':
          for(let i = 0; i < markers.length; i++) {
            markers[i].classList.remove('hidden')
            if (!markers[i].classList.contains('marker-message')) {
              markers[i].classList.add('hidden')
            }
          }
          break

        case 'zrak':
          for(let i = 0; i < markers.length; i++) {
            markers[i].classList.remove('hidden')
            if (!markers[i].classList.contains('marker-eye')) {
              markers[i].classList.add('hidden')
            }
          }
          break

        default:
          console.error('unknown item sense')        
      }
    },
    showAllMarkers() {
      const markers = document.getElementsByClassName('marker')
      this.menuShowed = false
      this.isFiltered = false
      for(let i = 0; i < markers.length; i++) {
        markers[i].classList.remove('hidden')
      }
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
  .fade-bottom-enter-active, .fade-bottom-leave-active, .fade-left-enter-active, .fade-left-leave-active {
    transition: all 0.4s ease;
  }

  .fade-bottom-leave-active, .fade-left-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .fade-bottom-enter-from, .fade-bottom-leave-to {
    transform: translateY(130%);
    opacity: 0;
  }

  .fade-left-enter-from, .fade-left-leave-to {
    transform: translateX(-130%);
    opacity: 0;
  }

  .close-btn {
    img {
      transition: transform .2s;

      &:hover {
        transform: rotate(90deg);
      }
    }
  }

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

    .marker-message-active {
      background-image: url('../assets/img/markers/message-active.svg');
    }

    .marker-hand {
      background-image: url('../assets/img/markers/hand.svg');
    }

    .marker-hand-active {
      background-image: url('../assets/img/markers/hand-active.svg');
    }

    .marker-eye {
      background-image: url('../assets/img/markers/eye.svg');
    }

    .marker-eye-active {
      background-image: url('../assets/img/markers/eye-active.svg');
    }

    .marker-smell {
      background-image: url('../assets/img/markers/smell.svg');
    }

    .marker-smell-active {
      background-image: url('../assets/img/markers/smell-active.svg');
    }

    .marker {
      background-size: cover;
      background-position: center;
      width: 50px;
      height: 50px;
      cursor: pointer;
      transition: background-image .3s;
      transition: width, height .2s ease;

      &:hover {
        width: 70px;
        height: 70px;
      }
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