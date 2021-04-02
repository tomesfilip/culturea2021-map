<template>
  <ul class="mob-menu-items w-full h-full mt-4 mobile:mt-6 flex flex-col items-center justify-center text-white">
    <div class="menu-item-mob w-4/5 mobile:w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
      <MenuItem :menuItem="menuItem" class="h-12 sm-mobile:h-16 my-4" />
      <hr class="border-t-2 rounded" v-if="!menuItem.isLast">
    </div>      
  </ul>
</template>
<script>
import MenuItem from './MenuItem.vue'

export default {
  props: ['menuItems'],
  components: { MenuItem }
}
</script>
<style lang="">
  
</style>