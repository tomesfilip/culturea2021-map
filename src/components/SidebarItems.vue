<template>
  <ul class="menu-items text-white" :class="{ showed : isOpened }">
    <div class="menu-item-mob w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
      <MenuItem :menuItem="menuItem" class="h-16 my-4" />
    </div>
  </ul>
</template>

<script>
import MenuItem from './MenuItem.vue'

export default {
  props: ['menuItems', 'isOpened'],
  components: { MenuItem }
}
</script>
<style lang="scss">
  .menu-items {
    visibility: hidden;
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: center;
    transition: all 0.4s ease-in;
    &.showed {
      display: flex;
      visibility: visible;
    }
  }
</style>