<template>
  <div v-if="detailShowed" class="detail text-white bg-green w-full h-screen p-8">
    <div class="detail-header flex items-center justify-around">
      <h2 class="uppercase flex-initial text-lg">Tradiční jídlo</h2>
      <CloseBtn class="flex-initial" @click="closeDetail" />
    </div>
    <div class="detail-info h-full flex flex-col items-center justify-around">
      <h3 class="uppercase">detail</h3>
      <h3 class="uppercase">adresa</h3>
      <h3 class="uppercase">otevírací doba</h3>
      <h3 class="uppercase">aktuální nabídka</h3>
      <h3 class="uppercase">odkaz na web místa</h3>
    </div>
  </div>
</template>

<script>
import CloseBtn from './CloseButton.vue'

export default {
  components: { CloseBtn },
  data() {
    return {
      detailShowed: false
    }
  },
  methods: {
    closeDetail() {
      this.detailShowed = false
    }
  }
}
</script>

<style>

</style>