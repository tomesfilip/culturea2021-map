<template>
  <nav id="mobile-menu">
    <SearchBar />
    <ul class="w-full h-full px-6 py-4 bg-green overflow-hidden">
      <li class="menu-item-mob" v-for="(menuItem, title) in menuItems" :key="title">
        <a :href="menuItem.url" class="align-middle">{{ menuItem.title }}</a>
      </li>
    </ul>
  </nav>
  
  <div class="flex">
    <CloseBtn />
    <AboutBtn />
  </div>
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