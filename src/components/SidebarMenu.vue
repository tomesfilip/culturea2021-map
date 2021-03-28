<template>
  <nav 
    @mouseenter="openSideMenu" @mouseleave="closeSideMenu"
    class="hidden md:flex flex-col items-center sidebar-menu h-screen bg-oliveGreen"
    :class="{ showed : isOpened }">
    <ul class="sidebar-menu-header w-full flex h-1/4" :class="{ showed : isOpened }">
      <BackToHomeLink :class="{ 'mb-6' : !isOpened }" />
      <SearchBtn />
    </ul>
    <ul class="menu-items text-white" :class="{ showed: isOpened }">
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
  .sidebar-menu {
    width: 8rem;
    transition: all 0.4s;
    &.showed {
      width: 16rem;
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

    .menu-items {
        opacity: 0;
        display: flex;
        width: 0;
        flex-direction: column;
        align-items: center;
        transition: all 0.4s;
        transition-delay: 0.5s;
        &.showed {
          width: 100%;
          opacity: 100%;
          
        }
      }
  }
</style>