<template>
  <TheMap />
</template>

<script>
import TheMap from './components/TheMap.vue'

export default {
  name: 'App',
  components: {
    TheMap
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
