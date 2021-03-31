<template>
  <button class="w-12 h-12 bg-white flex justify-center items-center rounded-full cursor-pointer"
    :class="{ 'bg-green' : !isActive }">
    <img v-if="!isActive" src="../assets/img/magnifier.svg" alt="lupa ikona bila">
    <img v-else src="../assets/img/green-magnifier.svg" alt="lupa ikona zelena">
  </button>
</template>
<script>
export default {
  props: ['isActive']
}
</script>