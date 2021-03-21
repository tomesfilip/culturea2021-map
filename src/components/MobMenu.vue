<template>
  <nav id="mobile-menu" class="w-full h-screen px-6 py-4 bg-green flex flex-col items-center justify-around overflow-hidden ">
    <SearchBar />
    <ul class="">
      <li class="menu-item-mob" v-for="(menuItem, title) in menuItems" :key="title">
        <a :href="menuItem.url" class="align-middle">{{ menuItem.title }}</a>
      </li>
    </ul>
    <div class="flex justify-around w-24">
      <CloseBtn />
      <AboutBtn />
    </div>
  </nav>
  
  
</template>
<script>
import SearchBar from './Searchbar.vue'
import CloseBtn from './CloseButton.vue'
import AboutBtn from './AboutButton.vue'

export default {
  components: { SearchBar, CloseBtn, AboutBtn },
  data() {
    return {
      menuItems: [
        {
          url: '#',
          title: 'Výstavy',
        },
        {
          url: '#',
          title: 'Přednášky',
        },
        {
          url: '#',
          title: 'Tipy',
        },
        {
          url: '#',
          title: 'Kulturní akce',
        },
        {
          url: '#',
          title: 'Tradiční jídlo',
        },
      ]
    }
  }
}
</script>
<style>
  
</style>