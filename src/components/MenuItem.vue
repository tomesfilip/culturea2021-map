<template>
  <li class="flex items-center h-14 my-4">
    <img :src="menuItem.icon" :alt="menuItem.iconName" class="pr-4">
    <a :href="menuItem.url" class="align-middle pr-4">{{ menuItem.title }}</a>
    <img src="../assets/img/white-arrow.svg" alt="white arrow">
  </li>
</template>
<script>
export default {
  props: ['menuItem']
}
</script>