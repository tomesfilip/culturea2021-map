<template>
  <nav id="mobile-menu" class="h-screen w-full flex md:hidden flex-coljustify-center items-center px-2 mobile:px-6 py-4 bg-green text-xl">
    <div class="flex w-full flex-col mt-4">
      <ul class="mob-menu-items w-full h-full mobile:mt-6 flex flex-col items-center justify-center text-white">
        <slot name="removeFiltersMobBtn"></slot>
        <slot name="menuItem"></slot> 
      </ul>
      <div class="close-btn">
        <slot name="mobMenuCloseBtn"></slot>
      </div>
    </div>    
  </nav>
</template>
<script>
export default {
  name: "MobMenu"
}
</script>