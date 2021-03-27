<template>
  <div class="mob-map-header flex justify-around items-center md:hidden w-full">
    <BackToHomeBtn />
    <MapSearchBox class="w-2/3" />    
  </div>
</template>
<script>
import BackToHomeBtn from './BackToHomeButton.vue'
import MapSearchBox from './MapSearchBox.vue'

export default {
  components: { BackToHomeBtn, MapSearchBox }
}
</script>