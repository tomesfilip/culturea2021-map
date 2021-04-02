<template>
  <nav v-show="menuShowed" id="mobile-menu" class="h-screen flex md:hidden flex-col items-center px-2 mobile:px-6 py-4 bg-green overflow-x-hidden text-xl">
    <MenuSearchBox class="h-1/6 max-h-16" />
    <ul class="menu-items w-full h-full mt-4 mobile:mt-6 flex flex-col items-center text-white">
      <div class="menu-item-mob w-4/5 mobile:w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
        <MenuItem :menuItem="menuItem" class="h-12 sm-mobile:h-16 my-4" />
        <hr class="border-t-2 rounded" v-if="!menuItem.isLast">
      </div>      
    </ul>
    <div class="close-btn h-1/6">
      <CloseBtn class="p-2" @click="menuShowed=false" />
    </div>
  </nav>
</template>
<script>
import MenuSearchBox from './MenuSearchBox.vue'
import MenuItem from './MenuItem.vue'
import CloseBtn from './CloseButton.vue'

export default {
  name: "MobMenu",
  components: { MenuSearchBox, MenuItem, CloseBtn },
  props: ['menuItems', 'menuShowed'],
  
  methods: {
    closeMobMenu() {
      this.menuShowed = false
    }
  }
}
</script>