<template>
  <nav 
    @mouseenter="openSideMenu" @mouseleave="closeSideMenu"
    class="hidden md:flex flex-col items-center sidebar-menu h-screen bg-oliveGreen"
    :class="{ showed : isOpened }">
    <ul class="sidebar-menu-header w-full flex h-1/4" :class="{ showed : isOpened }">
      <BackToHomeLink :class="{ 'mb-6' : !isOpened }" :isActive="isOpened"/>
      <SearchBtn :isActive="isOpened" />
    </ul>
    <SidebarItems :menuItems="menuItems" :isOpened="isOpened"/>
  </nav>
</template>
<script>
import SidebarItems from './SidebarItems.vue'
import BackToHomeLink from './BackToHomeLink.vue'
import SearchBtn from './SearchButton.vue'

export default {
  components: { SidebarItems, BackToHomeLink, SearchBtn },
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
  .sidebar-menu {
    width: 8rem;
    transition: all 0.4s ease-in-out;
    &.showed {
      width: 18rem;
      background: #1BB36C;
    }

    .sidebar-menu-header {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.4s;
      &.showed {
        flex-direction: row;
        justify-content: space-around;
      }      
    }
  }
</style>