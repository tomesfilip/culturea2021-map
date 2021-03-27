<template>
  <div class="menu-search-box flex justify-between items-center pl-6 pr-2 rounded-full h-12 bg-white">
    <input type="text" name="search" placeholder="Hledat..." 
      class="bg-none outline-none w-full pr-2 leading-10 placeholder-green placeholder-opacity-50">
    <SearchBtn />
  </div>
</template>
<script>
import SearchBtn from './SearchButton.vue'

export default {
  components: { SearchBtn }
}
</script>