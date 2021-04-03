<template>
  <div class="w-full h-full lg:h-52 bg-green lg:bg-white flex items-center">
    <div class="p-4 flex w-full h-full flex-col lg:flex-row text-center lg:text-left text-white lg:text-black">
      <h4 class="w-4/5 lg:w-1/6 mr-0 lg:mr-8 uppercase font-heading text-white lg:text-green self-start md:self-auto text-lg mobile:text-xl text-left">{{ mapItem.properties.name }}</h4>
      <div class="block lg:hidden close-btn fixed right-6 top-10">
        <slot name="mobCloseBtn"></slot>
      </div>
      <div class="map-item-detail w-full lg:w-4/6 h-5/6 lg:h-full flex flex-col justify-evenly">
        <div class="text flex mb-0 lg:mb-4 flex-col lg:flex-row">
          <p class="mr-0 lg:mr-2 uppercase mobile:text-lg lg:text-base font-bold">detail</p>
          <p>{{ mapItem.properties.detail_text }}</p>
        </div>
        <div class="text flex mb-0 lg:mb-4 flex-col lg:flex-row">
          <p class="mr-0 lg:mr-2 uppercase mobile:text-lg lg:text-base font-bold">adresa</p>
          <p>{{ mapItem.properties.place_name }}</p>
        </div>
        <div class="text flex flex-col lg:flex-row">
          <p class="mr-0 lg:mr-2 uppercase mobile:text-lg lg:text-base font-bold">otevírací doba</p>
          <p>{{ mapItem.properties.date }}</p>
        </div>
      </div>
      <div class="hidden lg:block close-btn fixed lg:right-10 bottom-24">
        <slot name="closeBtn"></slot>
      </div>
    </div>    
  </div>
</template>
<script>

export default {
  props: ['mapItem'],
}
</script>
<style>
  
</style>