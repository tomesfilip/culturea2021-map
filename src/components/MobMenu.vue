<template>
  <nav id="mobile-menu" class="h-screen flex md:hidden flex-col items-center px-2 mobile:px-6 py-4 bg-green overflow-x-hidden text-xl">
    <ul class="mob-menu-items w-full h-full mt-4 mobile:mt-6 flex flex-col items-center justify-center text-white">
        <slot name="removeFiltersMobBtn"></slot>
        <slot name="menuItem"></slot> 
    </ul>
    <div class="close-btn h-1/6">
      <slot name="mobMenuCloseBtn"></slot>
    </div>
  </nav>
</template>
<script>
export default {
  name: "MobMenu"
}
</script>