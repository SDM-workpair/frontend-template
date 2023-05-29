<template>
  <nav class="container flex items-center py-4 mt-4 sm:mt-12">

    <div class="py-1"><img src="@/assets/logo.png" width="60" alt="podcast logo"></div>
    <ul class="hidden sm:flex flex-1 justify-end items-center gap-12 text-bookmark-blue uppercase text-xs">
      <button type="button" class="bg-bookmark-black text-white rounded-md px-7 py-3 uppercase"><select-lang :class="prefixCls" /></button>
    </ul>
    <div class="flex sm:hidden flex-1 justify-end"><i class="text-xl fas fa-bars text-white cursor-pointer"></i></div>
  </nav>
</template>

<script>
import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: {
    SelectLang
  }
}

</script>
