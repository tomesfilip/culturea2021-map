<template>
  <button :href="menuItem.url" class="flex items-center cursor-pointer"  @mouseover="arrowHovered=true" @mouseleave="arrowHovered=false">
    <img :src="menuItem.icon" :alt="menuItem.iconName" class="pr-4">
    <p class="align-middle pr-4">{{ menuItem.title }}</p>
    <img src="../assets/img/white-arrow.svg" alt="white arrow" class="transition-transform" :class="{ 'transform translate-x-1.5': arrowHovered }">
  </button>
</template>

<script>
export default {
  props: ['menuItem'],
  data() {
    return {
      arrowHovered: false
    }
  }
}
</script>