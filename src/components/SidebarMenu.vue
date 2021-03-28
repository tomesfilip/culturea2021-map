<template>
  <nav class="hidden md:flex sidebar-menu w-32 h-screen bg-oliveGreen">
    <ul class="menu-items w-full flex flex-col justify-center items-center h-1/4">
      <BackToHomeLink class="mb-6" />
      <SearchBtn />
    </ul>
    <ul class="menu-items w-full text-white hidden" :class="{ active: isOpened }">
      <div class="menu-item-mob w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
        <MenuItem :menuItem="menuItem" />
      </div>
    </ul>
  </nav>
</template>
<script>
import MenuItem from './MenuItem.vue'
import BackToHomeLink from './BackToHomeLink.vue'
import SearchBtn from './SearchButton.vue'

export default {
  components: { MenuItem, BackToHomeLink, SearchBtn },
  props: ['menuItems'],
  data() {
    return {
      isOpened: false,
    }
  },
  methods: {
    openSideMenu() {
      this.isOpened = true
    },
    closeSideMenu() {
      this.isOpened = false
    }
  }
}
</script>
<style lang="scss">
</style>