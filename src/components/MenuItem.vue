<template>
  <a :href="menuItem.url" class="flex items-center">
    <img :src="menuItem.icon" :alt="menuItem.iconName" class="pr-4">
    <p class="align-middle pr-4">{{ menuItem.title }}</p>
    <img src="../assets/img/white-arrow.svg" alt="white arrow">
  </a>
</template>
<script>
export default {
  props: ['menuItem']
}
</script>