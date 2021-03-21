<template>
  <MobMenu />
  <!-- <TheMap /> -->
</template>

<script>
import TheMap from './components/TheMap.vue'
import MobMenu from './components/MobMenu.vue'

export default {
  name: 'App',
  components: {
    TheMap, MobMenu
  }
}
</script>

<style lang="scss">
#app {
  font-family: GalanoGrotesqueMedium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
