<template>
  <div class="mob-map-header flex justify-around items-center md:hidden w-full">
    <BackToHomeLink />
    <MapSearchBox class="w-2/3" />    
  </div>
</template>
<script>
import BackToHomeLink from './BackToHomeLink.vue'
import MapSearchBox from './MapSearchBox.vue'

export default {
  components: { BackToHomeLink, MapSearchBox }
}
</script>