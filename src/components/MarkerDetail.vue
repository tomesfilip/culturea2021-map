<template>
  <div class="w-full h-full lg:h-52 bg-green lg:bg-white flex items-center sm:justify-center">
    <div class="p-4 flex w-full h-full sm:w-1/2 lg:w-full flex-col lg:flex-row text-center lg:text-left text-white lg:text-black">
      <h4 class="w-4/5 sm:w-full sm:text-center lg:w-1/6 mr-0 lg:mr-8 uppercase font-heading text-white lg:text-green self-start md:self-auto text-lg mobile:text-xl text-left">{{ mapItem.properties.name }}</h4>
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
          <a :href="mapItem.properties.maps_link" target="_blank">{{ mapItem.properties.place_name }}</a>
        </div>
        <div class="text flex flex-col lg:flex-row">
          <p class="mr-0 lg:mr-2 uppercase mobile:text-lg lg:text-base font-bold">otevírací doba</p>
          <p>{{ mapItem.properties.date }}</p>
        </div>
        <div class="text flex flex-col lg:hidden">
          <a :href="mapItem.properties.place_link" target="_blank" class="uppercase">*odkaz na web místa*</a>
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