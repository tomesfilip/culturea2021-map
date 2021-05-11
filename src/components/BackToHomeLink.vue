<template>
    <a href="/" class="back-to-home-button bg-white w-12 h-12 flex justify-center items-center rounded-full cursor-pointer"
      :class="{ 'bg-green': !isActive }">
      <img v-if="!isActive" src="../assets/img/white-arrow.svg" alt="bílá šipka" class="transform rotate-180">
      <img v-else src="../assets/img/green-arrow.svg" alt="zelena sipka" class="transform rotate-180">
    </a>
</template>

<script>
export default {
  props: ['isActive']
}
</script>