<template>
  <nav 
    @mouseenter="openSideMenu" @mouseleave="closeSideMenu"
    class="hidden md:flex flex-col items-center sidebar-menu h-screen bg-oliveGreen"
    :class="{ showed : isOpened }">
    <ul class="sidebar-menu-header w-full flex h-40" :class="{ showed : isOpened }">
      <BackToHomeLink :isActive="isOpened"/>
    </ul>        
    <ul class="menu-items w-full flex flex-col justify-center items-center text-white" :class="{ showed : isOpened }">
      <div class="remove-filter-btn">
        <slot name="removeFiltersBtn"></slot>
      </div>
      <slot name="menuItem"></slot>
    </ul>
  </nav>
</template>
<script>
import BackToHomeLink from './BackToHomeLink.vue'

export default {
  components: { BackToHomeLink },
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
    }

    .menu-items {
      transition: transform .3s, opacity 1s;
      opacity: 0;
      transform: translateX(-150%);
      &.showed {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
</style>