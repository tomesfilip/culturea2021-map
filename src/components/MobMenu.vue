<template>
  <nav id="mobile-menu" class="w-full h-screen px-6 py-4 bg-green flex flex-col items-center justify-around overflow-hidden text-xl">
    <SearchBar />
    <ul class="menu-items w-full flex flex-col items-center text-white">
      <div class="menu-item-mob w-3/4" v-for="(menuItem, title) in menuItems" :key="title">
        <li class="flex items-center h-20 my-4">
          <img :src="menuItem.icon" :alt="menuItem.iconName" class="pr-4">
          <a :href="menuItem.url" class="align-middle pr-4">{{ menuItem.title }}</a>
          <img src="../assets/img/white-arrow.svg" alt="white arrow">
        </li>
        <hr class="border-t-2 rounded" v-if="!menuItem.isLast">
      </div>
      
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

import CutleryIcon from '@/assets/img/cutlery.svg'
import FlowerIcon from '@/assets/img/flower.svg'
import MessageIcon from '@/assets/img/message.svg'
import HandIcon from '@/assets/img/hand.svg'
import EyeIcon from '@/assets/img/eye.svg'

export default {
  components: { SearchBar, CloseBtn, AboutBtn },
  data() {
    return {
      menuItems: [
        {
          url: '#',
          icon: FlowerIcon,
          iconName: 'flower icon',
          title: 'Výstavy',
        },
        {
          url: '#',
          icon: MessageIcon,
          iconName: 'message icon',
          title: 'Přednášky',
        },
        {
          url: '#',
          icon: HandIcon,
          iconName: 'hand icon',
          title: 'Tipy',
        },
        {
          url: '#',
          icon: EyeIcon,
          iconName: 'eye icon',
          title: 'Kulturní akce',
        },
        {
          url: '#',
          icon: CutleryIcon,
          iconName: 'cutlery icon',
          title: 'Tradiční jídlo',
          isLast: true
        },
      ]
    }
  }
}
</script>